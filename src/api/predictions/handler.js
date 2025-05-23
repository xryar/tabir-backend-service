const autoBind = require("auto-bind");
const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');

class PredictHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this._modelPromise = tf.loadLayersModel('file://src/models/model.json');

        autoBind(this);
    }

    async postPredictHandler(request, h) {
        try {
            const { image } = request.payload;
            const { userId } = request.auth.credentials;

            const filename = `${Date.now()}_${image.hapi.filename}`;
            const filepath = path.join(__dirname, '../uploads', filename);

            const fileStream = fs.createWriteStream(filepath);
            await new Promise((resolve, reject) => {
                image.pipe(fileStream);
                image.on('end', resolve);
                image.on('error', reject);
            });

            const imageBuffer = fs.readFileSync(filepath);
            const tensor = tf.node.decodeImage(imageBuffer).expandDims();
            const model = await this._modelPromise;
            const prediction = model.predict(tensor);
            const result = prediction.dataSync();

            const predictedLabel = result.indexOf(Math.max(...result));

            const saved = await this._service.savePrediction({
                userId,
                filename,
                predictedLabel,
                rawPrediction: JSON.stringify(Array.from(result))
            });

            const response = h.response({
                status: 'success',
                message: 'Prediction sukses',
                data: {
                    id: saved.id,
                    filename,
                    predictedLabel,
                    prediction: result,
                }
            });
            response.code(201);
            return response;
        } catch (error) {
            fs.unlink(filepath);
            throw new ClientError('Gagal memproses gambar: ' + error.message, 400);
        }
    }
}

module.exports = PredictHandler;
