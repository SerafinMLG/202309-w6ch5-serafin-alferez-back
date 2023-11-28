import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { HobbiesController } from '../controller/hobbies.controller.js';
import { HobbiesMongoRepo } from '../repos/hobbies.mongo.repo.js'
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';

const debug = createDebug('W7E:hobbies:router');

export const hobbiesRouter = createRouter();
debug('Starting');

const fileInterceptor = new FileInterceptor();
const repo = new HobbiesMongoRepo();
const controller = new HobbiesController(repo);
const interceptor = new AuthInterceptor()

hobbiesRouter.get('/', controller.getAll.bind(controller));
// ShobbiesRouter.get('/search', controller.search.bind(controller));
hobbiesRouter.get('/:id', controller.getById.bind(controller));
hobbiesRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  fileInterceptor.singleFileStore('picture').bind(fileInterceptor),
  controller.create.bind(controller)
);
hobbiesRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor), // Seste interceptor tiene la finalidad de darme el id que viene en el token
  interceptor.authenticationHobbies.bind(interceptor),
  controller.update.bind(controller)
);

hobbiesRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationHobbies.bind(interceptor),
  controller.delete.bind(controller)
)
