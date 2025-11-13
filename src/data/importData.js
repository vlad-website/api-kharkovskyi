import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Catway } from '../models/Catway.js';
import { Reservation } from '../models/Reservation.js';
import fs from 'fs';

dotenv.config();

async function importData() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/russell_marina';
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    // читаем JSON-файлы
    const catways = JSON.parse(fs.readFileSync(new URL('./catways.json', import.meta.url)));
    const reservations = JSON.parse(fs.readFileSync(new URL('./reservations.json', import.meta.url)));

    // очищаем старые данные
    await Catway.deleteMany();
    await Reservation.deleteMany();

    // вставляем новые
    await Catway.insertMany(catways);
    await Reservation.insertMany(reservations);

    console.log('✅ Data imported successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Import failed:', err);
    process.exit(1);
  }
}

// если вызван напрямую через npm script
if (process.argv[2] === '--import') {
  importData();
}