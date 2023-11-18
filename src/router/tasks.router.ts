import { Router as createRouter } from 'express';
import { Request, Response } from 'express';

export const tasksRouter = createRouter();

tasksRouter.get('/', (_req: Request, res: Response) => {
  res.send('Respuesta al Get de Tasks');
});

tasksRouter.get('/search', (req: Request, res: Response) => {
  console.log(req.query);
  res.send('Respuesta al Get de la Task search');
});

tasksRouter.get('/:id', (req: Request, res: Response) => {
  res.send('Respuesta al Get de la Task: ' + req.params.id);
});

tasksRouter.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.send('Respuesta al Post de Tasks');
});
tasksRouter.patch('/:id', (_req: Request, res: Response) => {
  res.send('Respuesta al Patch de Tasks');
});
tasksRouter.delete('/:id', (_req: Request, res: Response) => {
  res.send('Respuesta al Delete de Tasks');
});
