import { ImgData } from "../types/img.data.js";
import { User } from "./user.js"

export type Hobbies = {
  id: string,
  topic: string,
  author: User,
  place: string,
  picture: ImgData;
} 
