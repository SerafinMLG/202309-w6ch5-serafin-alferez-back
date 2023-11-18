import { Request, Response } from 'express';

const data = [
  { id: 1, title: 'Prueba 1', author: 'Pepe' },
  { id: 2, title: 'Prueba 2', author: 'Raul' },
];

export const getAll = (_req: Request, res: Response) => {
  res.json(data);
};

export const getById = (req: Request, res: Response) => {
  const result = data.find((item) => item.id === Number(req.params.id));
  res.json(result);
};

export const search = (_req: Request, _res: Response) => {};

export const create = (req: Request, res: Response) => {
  const result = { ...req.body, id: data.length + 1 };
  data.push(result);
  res.json(result);
};

export const update = (req: Request, res: Response) => {
  let result = data.find((item) => Number(item.id) === Number(req.params.id));
  result = { ...result, ...req.body };
  data[data.findIndex((item) => item.id === Number(req.params.id))] = result!;
  res.json(result);
};

export const remove = (req: Request, res: Response) => {
  data.splice(
    data.findIndex((item) => item.id === Number(req.params.id)),
    1
  );
  res.json({});
};
