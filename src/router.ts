import { Router } from 'express';

import { botService } from '@/services/bot';

export const router = Router()
  // Welcome route
  .get('/test', (_req, res) => {
    res.status(200).send('👋 Express server!');
  })
  // Bot routes
  .get('/bot/greeting', botService.greeting)
  .get('/bot/stream', botService.stream);
