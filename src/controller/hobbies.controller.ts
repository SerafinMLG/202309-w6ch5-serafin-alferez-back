import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Repository } from '../repos/repo.js';
import { Hobbies } from '../entities/hobbies.js';
import { Controller } from './controller.js';
import { HttpError } from '../types/http.error.js';
import { MediaFiles } from '../services/media.files.js';


const debug = createDebug('W7E:hobbies:controller');

export class HobbiesController extends Controller<Hobbies>{
  declare cloudinaryService: MediaFiles;
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: Repository<Hobbies>) {
    super(repo);
    this.cloudinaryService = new MediaFiles();
    debug('Instantiated')
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.author = { id: req.body.userId };
      if (!req.file)
      throw new HttpError(406, 'Not Acceptable', 'Invalid multer file');
      const imgData = await this.cloudinaryService.uploadImage(req.file.path);
      debug('createHobbie', imgData)
      req.body.picture = imgData;
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.delete(req.params.id);
      res.status(204);
      res.statusMessage = 'No Content';
      res.json({});
    } catch (error) {
      next(error);
    }
  }

}
