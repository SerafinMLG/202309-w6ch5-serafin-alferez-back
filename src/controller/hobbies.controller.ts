import { Request, Response } from 'express';
import { Hobbies } from '../model/hobbies';
import fs from 'fs/promises';
import { ObjectEncodingOptions } from 'fs';



const fileName = './api/db.json';

const codeOptions: ObjectEncodingOptions = {
  encoding: 'utf-8',
};

export const readDataFile = async () => {
  try {
    const rawData = (await fs.readFile(fileName, codeOptions)) as string;
    return JSON.parse(rawData).hobbies as Hobbies[];
  } catch (error) {
    console.log((error as Error).message);
  }
};

const writeDataFile = async (hobbies: Hobbies[]) => {
  try {
    const data = { hobbies }; // Crear un objeto con la propiedad "films"
    await fs.writeFile(fileName, JSON.stringify(data), 'utf8');
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  const jsonData = await readDataFile();
  res.json(jsonData);
};

export const getById = async (req: Request, res: Response) => {
  const jsonData = (await readDataFile()) as Hobbies[];
  const result = jsonData.find(
    (item: { id: number }) => item.id === Number(req.params.id)
  );
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const jsonData = (await readDataFile()) as Hobbies[];
  const maxId = Math.max(...jsonData.map((item) => item.id), 0);
  const newHobbie = { ...req.body, id: maxId + 1 };
  jsonData.push(newHobbie);
  await writeDataFile(jsonData);
  res.json(newHobbie);
};

export const update = async (req: Request, res: Response) => {
  try {
    const jsonData = (await readDataFile()) as Hobbies[];
    const index = jsonData.findIndex(
      (item: { id: number }) => item.id === Number(req.params.id)
    );
    // eslint-disable-next-line no-negated-condition
    if (index !== -1) {
      const updatedHobbie = { ...jsonData[index], ...req.body };
      jsonData[index] = updatedHobbie;
      await writeDataFile(jsonData);
      res.json(updatedHobbie);
    } else {
      res.status(404).json({ error: 'Hobbies not found' });
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const jsonData = (await readDataFile()) as Hobbies[];
    const index = jsonData.findIndex(
      (item: { id: number }) => item.id === Number(req.params.id)
    );
    // eslint-disable-next-line no-negated-condition
    if (index !== -1) {
      jsonData.splice(index, 1);
      await writeDataFile(jsonData);
      res.json({});
    } else {
      res.status(404).json({ error: 'Hobbies not found' });
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};
