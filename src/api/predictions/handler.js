const autoBind = require("auto-bind");
const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs');

class PredictHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        autoBind(this);
    }

    async postPredictHandler(request, h) {
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
        const model = await tf.loadLayersModel('file://src/models/model.json');
        const prediction = model.predict(tensor);
        const result = prediction.dataSync();

        const predictedLabel = result.indexOf(Math.max(...result));

        const saved = await this._service.savePrediction({
            userId,
            filename,
            predictedLabel,
            rawPrediction: JSON.stringify(Array.from(result))
        });

        return h.response({
            status: 'success',
            message: 'Prediction sukses',
            data: saved
        }).code(201);
    }
}

module.exports = PredictHandler;
