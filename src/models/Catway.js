import mongoose from 'mongoose';

/**
 * Catway model
 * @typedef {Object} Catway
 * @property {number} catwayNumber
 * @property {string} catwayType
 * @property {string} catwayState
 */

const catwaySchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1
    },
    catwayType: {
      type: String,
      enum: ['short', 'long'],
      required: true
    },
    catwayState: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

export const Catway = mongoose.model('Catway', catwaySchema);