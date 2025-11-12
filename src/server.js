import { app } from './app.js';
import mongoose from 'mongoose';
import { config } from './config.js';

async function start() {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('MongoDB connected');

    app.listen(config.port, () => {
      console.log(`Server listening on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

start();