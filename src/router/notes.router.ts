import { Router as createRouter } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  search,
  update,
} from '../controller/notes.controller.js';

export const notesRouter = createRouter();

notesRouter.get('/', getAll);
notesRouter.get('/search', search);
notesRouter.get('/:id', getById);
notesRouter.post('/', create);
notesRouter.patch('/:id', update);
notesRouter.delete('/:id', remove);
