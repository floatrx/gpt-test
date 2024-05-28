import { Router } from 'express';

import { delay } from '@/lib/delay';
import { botService } from '@/services/bot';

export const router = Router()
  // Welcome route
  .get('/test', async (_, res) => {
    await delay(1000);
    res.status(200).send('👋 Express server!');
  })
  // Bot routes
  .get('/bot/greeting', botService.greeting)
  .get('/bot/stream', botService.stream);
