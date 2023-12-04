import mongoose from "mongoose";
import 'dotenv/config';

export const dbConnect = () => {
  const user = process.env.USER_DB;
  const passwd = process.env.PASSWD_DB;
  const dataBase = 'WEEK8'
  const uri = `mongodb+srv://${user}:${passwd}@cluster0.wgjyryi.mongodb.net/${dataBase}?retryWrites=true&w=majority`;
  return mongoose.connect(uri)
};
