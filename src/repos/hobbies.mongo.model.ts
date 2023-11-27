import { Schema, model } from 'mongoose';
import { Hobbies } from '../entities/hobbies.js';

const hobbiesSchema = new Schema<Hobbies>({
  topic: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  place: {
    type: String,
  },
  picture: {
    publicId: String,
    size: Number,
    format: String,
    url: String,
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
