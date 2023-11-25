import { HobbieModel } from './hobbies.mongo.model.js';
import createDebug from 'debug';
import { Hobbies } from '../entities/hobbies';
import { UsersMongoRepo } from './users/users.mongo.repo.js';
import { HttpError } from '../types/http.error.js';
import { Repository } from './repo.js';
import mongoose from 'mongoose';

const debug = createDebug('W7E:hobbies:mongo:repo');

export class HobbiesMongoRepo implements Repository<Hobbies> {
  userRepo: UsersMongoRepo;
  constructor() {
    this.userRepo = new UsersMongoRepo();
    debug('Instantiated');
  }

  // Sasync search({
  //   key,
  //   value,
  // }: {
  //   key: keyof Hobbies;
  //   value: unknown;
  // }): Promise<Hobbies[]> {
  //   const result = await HobbieModel.find({ [key]: value })
  //     .populate('author', {
  //       notes: 0,
  //     })
  //     .exec();
  //   return result;
  // }

  async getAll(): Promise<Hobbies[]> {
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

  
  async create(newItem: Omit<Hobbies, 'id'>): Promise<Hobbies> {
    const userID = newItem.author.id;
    debug('item',newItem)
    const user = await this.userRepo.getById(userID);   // Aqui comprobamos que el user existe.Si no existe saltará un error por detrás, por eso no hay un IF
    const result: Hobbies = await HobbieModel.create({ ...newItem, author: userID});
    user.hobbies.push(result); // Añadimos la nueva nota en el array de notas. Es un cambio local a la variable
    await this.userRepo.update(userID, user);   // Esto modifica la DB con los cambios.
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

    const userID = result.author.id;
    const user = await this.userRepo.getById(userID);
    // Temp const deletedNoteID = new mongoose.mongo.ObjectId(id);
    user.hobbies = user.hobbies.filter((item) => {
      const itemID = item as unknown as mongoose.mongo.ObjectId;
      return itemID.toString() !== id; // Temp deletedNoteID.toString();
    });
    await this.userRepo.update(userID, user);
  }
}
