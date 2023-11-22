import { hash, compare } from "bcrypt"

export abstract class Auth {
  static hash(value: string): Promise<string> {
    const saltRound = 10   // Numero de vueltas de hash
    return hash(value, saltRound)
  }

  static compare(value: string, hash: string): Promise<boolean> {
      return compare(value, hash);
    }
  }
