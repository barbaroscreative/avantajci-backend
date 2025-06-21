import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import authRouter from './routes/auth';
import storeRouter from './routes/store';
import bankRouter from './routes/bank';
import campaignRouter from './routes/campaign';
import uploadRouter from './routes/upload';
import categoryRouter from './routes/category';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5008;

app.get('/', (req, res) => {
  res.send('API Çalışıyor!');
});

app.use('/api/auth', authRouter);
app.use('/api/store', storeRouter);
app.use('/api/bank', bankRouter);
app.use('/api/campaign', campaignRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/category', categoryRouter);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sunucu ${PORT} portunda çalışıyor.`);
      console.log(`API URL: ${process.env.VERCEL_URL || `http://localhost:${PORT}`}`);
    });
  })
  .catch((error) => {
    console.error('Veritabanı bağlantı hatası:', error);
  }); 