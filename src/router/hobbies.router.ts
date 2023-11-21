import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { HobbiesController } from '../controller/hobbies.controller.js';
import { HobbiesMongoRepo } from '../repos/hobbies.mongo.repo.js'

const debug = createDebug('W7E:tasks:router');

export const hobbiesRouter = createRouter();
debug('Starting');

const repo = new HobbiesMongoRepo();
const controller = new HobbiesController(repo);

hobbiesRouter.get('/', controller.getAll.bind(controller));
hobbiesRouter.get('/search', controller.search.bind(controller));
hobbiesRouter.get('/:id', controller.getById.bind(controller));
hobbiesRouter.post('/', controller.create.bind(controller));
hobbiesRouter.patch('/:id', controller.update.bind(controller));
hobbiesRouter.patch('addUser/:id', controller.update.bind(controller));
hobbiesRouter.patch('removeUser/:id', controller.update.bind(controller));
hobbiesRouter.delete('/:id', controller.delete.bind(controller));
