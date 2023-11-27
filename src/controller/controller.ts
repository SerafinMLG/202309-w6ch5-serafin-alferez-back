/* eslint-disable no-useless-constructor */

import { Repository } from '../repos/repo.js';
import { NextFunction, Request, Response } from 'express';

export abstract class Controller<T extends { id: unknown }> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: Repository<T>) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.avatar = {
        publicId: req.file?.filename,
        format: req.file?.mimetype,
        url: req.file?.path,
        size: req.file?.size,
      };
      const result = await this.repo.create(req.body);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

}
