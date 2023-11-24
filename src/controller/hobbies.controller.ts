import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Repository } from '../repos/repo.js';
import { Hobbies } from '../entities/hobbies.js';

const debug = createDebug('W7E:hobbies:controller');

export class HobbiesController {
  // eslint-disable-next-line no-unused-vars
  constructor(private repo: Repository<Hobbies>) {
    debug('Instantiated');
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

  // Sasync search(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await this.repo.search({
  //       key: Object.entries(req.query)[0][0] as keyof Hobbies,
  //       value: Object.entries(req.query)[0][1],
  //     });
  //     res.json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.author = { id: req.body.userId };
      const result = await this.repo.create(req.body);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
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
