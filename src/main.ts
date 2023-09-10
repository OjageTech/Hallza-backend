import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';

import { MongoClient } from 'mongodb';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const uri = process.env.MONGO_DB_URI;
  const PORT = process.env.PORT || 3000;

  app.enableCors({
    allowedHeaders: ['Content-Type'],
    origin: '*',
    credentials: true,
  });

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error('Error:', err);
  }
}

bootstrap();
