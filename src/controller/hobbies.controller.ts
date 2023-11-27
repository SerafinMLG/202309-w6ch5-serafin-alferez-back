import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Repository } from '../repos/repo.js';
import { Hobbies } from '../entities/hobbies.js';
import { Controller } from './controller.js';

const debug = createDebug('W7E:hobbies:controller');

export class HobbiesController extends Controller<Hobbies>{
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: Repository<Hobbies>) {
    super(repo);
    debug('Instantiated')
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.getById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }


  async create(req: Request, res: Response, next: NextFunction) {
    try {

      req.body.author = { id: req.body.userId }
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.update(req.params.id, req.body);
      res.json(result);
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
