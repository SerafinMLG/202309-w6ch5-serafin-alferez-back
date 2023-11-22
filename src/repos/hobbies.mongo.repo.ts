import { HobbieModel } from './hobbies.mongo.model.js';
import createDebug from 'debug';
import { Hobbies } from '../entities/hobbies';
import { UsersMongoRepo } from './users/users.mongo.repo.js';
import { HttpError } from '../types/http.error.js';
import { Repository } from './repo.js';


let debug = createDebug('W7E:hobbies:mongo:repo');

export class HobbiesMongoRepo implements Repository<Hobbies> {
  userRepo: UsersMongoRepo;
  constructor() {
    this.userRepo = new UsersMongoRepo();
    debug('Instantiated');
  }

  async getAll(): Promise<Hobbies[]> {
    debug = createDebug('getAll')
    const result = await HobbieModel.find()
      .populate('author', {
        hobbies: 0,
      })
      .exec();
    return result;
  }

  async getById(id: string): Promise<Hobbies> {
    const result = await HobbieModel.findById(id)
      .populate('author', {
        hobbies: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  search({ _key, _value }: { _key: string; _value: unknown }): Promise<Hobbies[]> {
    // Temp this.hobbies.find((item) => item[_key] === _value)
    throw new Error('Method not implemented.');
  }

  
  async create(newItem: Omit<Hobbies, 'id'>): Promise<Hobbies> {
    debug = createDebug('create')
    const userID = newItem.author.id;
    newItem.author = await this.userRepo.getById(userID);
    const result: Hobbies = await HobbieModel.create(newItem);

    newItem.author.hobbies.push(result.id as unknown as Hobbies);
    debug(newItem.author);
    await this.userRepo.update(userID, newItem.author);
    return result;
  }

  async update(id: string, updatedItem: Partial<Hobbies>): Promise<Hobbies> {
    const result = await HobbieModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    })
      .populate('author', {
        hobbies: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await HobbieModel.findByIdAndDelete(id)
      .populate('author', {
        hobbies: 0,
      })
      .exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
