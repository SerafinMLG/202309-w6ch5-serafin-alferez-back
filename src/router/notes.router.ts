import { Router as createRouter } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../controller/notes.controller.js';

export const hobbiesRouter = createRouter();

hobbiesRouter.get('/', getAll);
hobbiesRouter.get('/:id', getById);
hobbiesRouter.post('/', create);
hobbiesRouter.patch('/:id', update);
hobbiesRouter.delete('/:id', remove);
