import mongoose from 'mongoose';

/**
 * Reservation model
 * @typedef {Object} Reservation
 * @property {number} catwayNumber
 * @property {string} clientName
 * @property {string} boatName
 * @property {Date} startDate
 * @property {Date} endDate
 */

const reservationSchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: Number,
      required: true
    },
    clientName: {
      type: String,
      required: true,
      trim: true
    },
    boatName: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export const Reservation = mongoose.model('Reservation', reservationSchema);