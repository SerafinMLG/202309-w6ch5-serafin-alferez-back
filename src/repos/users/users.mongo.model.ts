import { Schema, model } from 'mongoose';
import { User } from '../../entities/user.js';


const usersSchema = new Schema<User>({
 email: {
  type: String,
  required: true,
  unique: true
 },
 passwd: {
  type: String,
  required: true
 },
 name: {
  type: String,
 },
 surname: String,   // Cuando solo le vamos a dar un tipo podemos hacerlo directamente así
 age: Number,
 hobbies: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Hobbie',
  }
 ] 
});

usersSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const UserModel = model('User', usersSchema, 'users');
