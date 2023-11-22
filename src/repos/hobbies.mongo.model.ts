import { Schema, model } from 'mongoose';
import { Hobbies } from '../entities/hobbies.js';

const hobbiesSchema = new Schema<Hobbies>({
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

hobbiesSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const HobbieModel = model('Hobbie', hobbiesSchema, 'hobbies');
