// C import { Hobbies } from '../entities/hobbies.js';
// import { HobbiesMongoRepo } from './hobbies.mongo.repo.js';
// import { HttpError } from '../types/http.error.js';
// import { HobbieModel } from './hobbies.mongo.model.js';

// jest.mock('./hobbies.mongo.model.js');

// describe('Given HobbiesMongoRepo class', () => {
//   let mockId: string;
//   let mockName: string;
//   let mockData: Partial<Hobbies>[];

//   beforeEach(() => {
//     mockId = '1';
//     mockName = 'have a fun';
//     mockData = [{ id: mockId, name: mockName }];

//     (HobbieModel.find as jest.Mock).mockResolvedValue(mockData);
//     (HobbieModel.findById as jest.Mock).mockResolvedValue(mockData[0]);
//     (HobbieModel.create as jest.Mock).mockResolvedValue(mockData[0]);
//     (HobbieModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockData[0]);
//     (HobbieModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockData[0]);
//   });

//   describe('When we instantiate it without errors', () => {
//     const repo = new HobbiesMongoRepo();
//     test('Then getAll should return the list of hobbies', async () => {
//       const result = await repo.getAll();
//       expect(result).toEqual(mockData);
//     });

//     test('Then getById should return the hobbie with the specified id', async () => {
//       const result = await repo.getById(mockId);
//       expect(result).toEqual(mockData[0]);
//     });

//     test('Then create should add a new hobbie and return it', async () => {
//       const newHobbie = { name: mockName } as Omit<Hobbies, 'id'>;
//       const result = await repo.create(newHobbie);
//       expect(result).toEqual(mockData[0]);
//     });

//     test('Then update should modify an existing hobbie and return it', async () => {
//       const updatedHobbie = { name: mockName };
//       const result = await repo.update(mockId, updatedHobbie);
//       expect(result).toStrictEqual({
//         id: mockId,
//         name: mockName,
//       });
//     });

//     test('Then delete should remove an existing hobbie', async () => {
//       await repo.delete(mockId);
//     });

//     test('Then delete should throw HttpError for non-existent id', async () => {
//       const nonExistentId = 'non-existent-id';
//       (HobbieModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
//       await expect(repo.delete(nonExistentId)).rejects.toThrow(HttpError);
//     });
//   });
// });
