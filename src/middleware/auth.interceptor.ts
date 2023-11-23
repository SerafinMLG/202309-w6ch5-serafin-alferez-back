import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
import { HobbiesMongoRepo } from '../repos/hobbies.mongo.repo.js';


const debug = createDebug('W7E:auth:interceptor');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated');
  }

  authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenHeader = req.get('Authorization');
      if (!tokenHeader?.startsWith('Bearer'))
        throw new HttpError(401, 'Unauthorized');
      const token = tokenHeader.split(' ')[1];
      const tokenPayload = Auth.verifyAndGetPayload(token);
      req.body.userId = tokenPayload.id;
      next();
    } catch (error) {
      next(error);
    }
  }

  async authenticationHobbies(req: Request, res: Response, next: NextFunction) {
    try {
      // Eres el usuario
      const userID = req.body.userId;
      // Quieres actuar sobre el hobbie
      const hobbiesID = req.params.id;
      const repoHobbies = new HobbiesMongoRepo();
      const hobbie = await repoHobbies.getById(hobbiesID);
      if (hobbie.author.id !== userID)
        throw new HttpError(401, 'Unauthorized', 'User not valid');
      next();
    } catch (error) {
      next(error);
    }
  }
}
