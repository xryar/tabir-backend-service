const { nanoid } = require("nanoid");
const { Pool } = require("pg");

class PredictionsService{
    constructor() {
        this._pool = new Pool();
    }

    async savePrediction({ userId, filename, predictedLabel, rawPrediction }) {
        const id = `pred-${nanoid(16)}`;
        const query = {
            text: `INSERT INTO predictions VALUES ($1, $2, $3, $4, $5, DEFAULT) RETURNING id`,
            values: [id, userId, filename, predictedLabel, rawPrediction],
        }

        const result = await this._pool.query(query);

        return result.rows[0];
    }
}

module.exports = PredictionsService;
