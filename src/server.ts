/**
 * Simple Express server
 * - static site serving
 * - rate limiting
 * - error handling
 * - API routing
 */
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import path from 'node:path';

import { ONE_MINUTE, PORT, REQUESTS_LIMIT } from '@/config';
import { mainErrorHandler, notFound, syntaxErrorHandler } from '@/middleware/errors';
import { router } from '@/router';

const app = express();

// app.use(cors());
app.use(express.json()); // parse application/json

// Serve static site
app.use(express.static(path.join(__dirname, '../public')));

// Throttle requests
app.use(
  rateLimit({
    windowMs: ONE_MINUTE,
    statusCode: 429,
    skip: (req) => req.hostname === 'localhost',
    limit: REQUESTS_LIMIT, // limit each IP to 15 requests per windowMs
    message: 'Too many requests from this IP, please try again after a few minutes',
  }),
);

// API
app.use('/api', router);

// Error Handling middlewares
app.use(mainErrorHandler);
app.use(syntaxErrorHandler);
app.use(notFound);

// Start server
export const startServer = async () => {
  try {
    app.listen(PORT, async () => {
      console.log(`👋 Express server is running!\n   http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.error('📦 Error:', e.message);
  }
};
