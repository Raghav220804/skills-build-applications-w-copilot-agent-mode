import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit-tracker';

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running.',
    port: PORT,
    mongodb: MONGODB_URI
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on http://0.0.0.0:${PORT}`);
      console.log('Connected to MongoDB at', MONGODB_URI);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
