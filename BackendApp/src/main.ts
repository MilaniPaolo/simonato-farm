import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../simonato-farm-test-firebase-adminsdk-2hxav-767cc6197c.json';
import * as cookieParser from 'cookie-parser';

export let db;

async function bootstrap() {

  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
      projectId: serviceAccount.project_id
    })
  });

  db = admin.firestore();
  db.settings({ ignoreUndefinedProperties: true });

  const app = await NestFactory.create(AppModule, { cors: {
      origin: 'http://localhost:8100',
      credentials: true,
    }
  });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
