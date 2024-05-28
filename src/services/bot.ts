import type { Request, Response } from 'express';

import { createPrompt } from '@/completions';
import { safeService } from '@/middleware/errors';

/**
 * Ticket CRUD service methods
 */
const methods = {
  async greeting(_req: Request, res: Response) {
    const [answer] = await createPrompt();
    res.status(200).json({ answer });
  },
  // Test stream
  async stream(_req: Request, res: Response) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    await createPrompt('say a long joke', [], true, (content) => {
      res.write(content);
    });

    res.end();
  },
};

export const botService = safeService(methods);
