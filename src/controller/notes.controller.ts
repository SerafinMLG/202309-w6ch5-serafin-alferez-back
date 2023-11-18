import { Request, Response } from 'express';
import { Hobbies } from '../model/hobbies';
import fs from 'fs';


const dataRoot = './api/db.json';
export let arrayOfData: Hobbies[] = [];

try {
  const myData = fs.readFileSync(dataRoot, 'utf-8');
  arrayOfData = JSON.parse(myData).things || [];
} catch (error) {
  console.log('Error al leer el archivo', error);
}

export const getAll = (_req: Request, res: Response) => {
  res.json(arrayOfData);
};

export const getById = (req: Request, res: Response) => {
  const result = arrayOfData.find((item) => item.id === Number(req.params.id));
  res.json(result);
};

export const search = (_req: Request, _res: Response) => {};

export const create = (req: Request, res: Response) => {
  const result = { ...req.body, id: arrayOfData.length + 1 };
  arrayOfData.push(result);
  res.json(result);
};

export const update = (req: Request, res: Response) => {
  let result = arrayOfData.find((item) => Number(item.id) === Number(req.params.id));
  result = { ...result, ...req.body };
  arrayOfData[arrayOfData.findIndex((item) => item.id === Number(req.params.id))] = result!;
  res.json(result);
};

export const remove = (req: Request, res: Response) => {
  arrayOfData.splice(
    arrayOfData.findIndex((item) => item.id === Number(req.params.id)),
    1
  );
  res.json({});
};
