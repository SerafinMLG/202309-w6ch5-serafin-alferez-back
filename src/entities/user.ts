import { Hobbies } from "./hobbies.js";

export type LoginUser = {
  email: string;
  passwd: string;
}

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  age: number;
  hobbies: Hobbies[];
};

