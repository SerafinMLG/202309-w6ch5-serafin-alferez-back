import { Hobbies } from '../entities/hobbies';
import { HobbieModel } from './hobbies.mongo.model';
import { Repository } from './repo';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('W7E:notes:mongo:repo');

export class HobbiesMongoRepo implements Repository<Hobbies> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<Hobbies[]> {
    const result = await HobbieModel.find();
    return result;
  }

  async getById(id: string): Promise<Hobbies> {
    const result = await HobbieModel.findById(id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  search({ _key, _value }: { _key: string; _value: unknown }): Promise<Hobbies[]> {
    // Temp this.notes.find((item) => item[_key] === _value)
    throw new Error('Method not implemented.');
  }

  async create(newItem: Omit<Hobbies, 'id'>): Promise<Hobbies> {
    const result: Hobbies = await HobbieModel.create(newItem);
    return result;
  }

  async update(id: string, updatedItem: Partial<Hobbies>): Promise<Hobbies> {
    const result = await HobbieModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await HobbieModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
