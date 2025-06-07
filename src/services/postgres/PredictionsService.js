const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PredictionsService {
  constructor() {
    this._pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async addPrediction({ prediction, userId }) {
    const id = `prediction-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO predictions VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, userId, prediction, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Prediksi gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPredictionsByUserId(userId) {
    const query = {
      text: `SELECT predictions.id, users.username, predictions.prediction, predictions.created_at
      FROM predictions
      JOIN users on users.id = predictions.user_id
      WHERE predictions.user_id = $1
      ORDER BY predictions.created_at DESC`,
      values: [userId]
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getPredictionById(id) {
    const query = {
      text: `SELECT * FROM predictions
        JOIN users ON users.id = predictions.user_id
        WHERE predictions.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Prediksi tidak ditemukan');
    }

    return result.rows[0];
  }

  async deletePredictionById(id) {
    const query = {
      text: 'DELETE FROM predictions WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Prediksi gagal dihapus, Id tidak ditemukan');
    }
  }

  async verifyPredictionOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM predictions WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Prediksi tidak ditemukan');
    }

    const prediction = result.rows[0];

    if (prediction.user_id !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async verifyPredictionAccess(predictionId, userId) {
    await this.verifyPredictionOwner(predictionId, userId);
  }
}

module.exports = PredictionsService;
