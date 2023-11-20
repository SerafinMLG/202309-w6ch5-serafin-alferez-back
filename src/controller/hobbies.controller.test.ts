import { Request, Response } from 'express';
import { HobbiesFileRepo } from '../repos/hobbies.file.repo';
import { HobbiesController } from './hobbies.controller';
import './hobbies.controller';

describe('Given HobbiesController class', () => {
  let controller: HobbiesController;
  let mockResponse: Response;

  beforeEach(() => {

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      statusMessage: '',
      json: jest.fn(),
    } as unknown as Response;
  });

  describe('When we instantiate it', () => {
    test('Then getAll should return correct data', async () => {
      HobbiesFileRepo.prototype.getAll = jest.fn().mockResolvedValue([{}]);

      const mockRequest: Request = {
        body: {},
      } as Request;

      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });

    describe('When we instantiated it', () => {
      test('Then getById should return the correct data when a valid ID is provided', async () => {
        const mockId = '123';
        const mockResult = { id: '123', name: 'Sample Hobbie' };
        HobbiesFileRepo.prototype.getById = jest
          .fn()
          .mockResolvedValue(mockResult);

        const mockRequest: Request = {
          params: { id: mockId },
        } as unknown as Request;

        await controller.getById(mockRequest, mockResponse, jest.fn());

        expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      });
    });

    describe('When we instantiated it', () => {
      test('Then create method should create a new hobby and return 201 status with correct data', async () => {
        const mockRequestBody = { name: 'New Hobbie', age: 25 };
        const mockCreatedResult = {
          id: '123',
          name: 'New Hobbie',
          age: 25,
        };
        HobbiesFileRepo.prototype.create = jest
          .fn()
          .mockResolvedValue(mockCreatedResult);

        const mockRequest: Request = {
          body: mockRequestBody,
        } as Request;

        await controller.create(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.statusMessage).toBe('Created');
        expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedResult);
      });
    });

    describe('When we instantiated it', () => {
      test('Then update method should update a hobby and return the updated data', async () => {
        const mockId = '123';
        const mockRequestBody = { name: 'Updated Hobbie', age: 26 };
        const mockUpdatedResult = {
          id: '123',
          name: 'Updated Hobbie',
          age: 26,
        };
        HobbiesFileRepo.prototype.update = jest
          .fn()
          .mockResolvedValue(mockUpdatedResult);

        const mockRequest: Request = {
          params: { id: mockId },
          body: mockRequestBody,
        } as unknown as Request;

        await controller.update(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedResult);

        expect(HobbiesFileRepo.prototype.update).toHaveBeenCalledWith(
          mockId,
          mockRequestBody
        );
      });
    });

    describe('When we instantiated it', () => {
      test('Then delete method should delete a hobby and return 204 status with no content', async () => {
        const mockId = '123';
        HobbiesFileRepo.prototype.delete = jest
          .fn()
          .mockResolvedValue(undefined);

        const mockRequest: Request = {
          params: { id: mockId },
        } as unknown as Request;

        await controller.delete(mockRequest, mockResponse, jest.fn());

        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.statusMessage).toBe('No Content');
        expect(mockResponse.json).toHaveBeenCalledWith({});
      });

      test('Then delete method should handle errors when deleting a hobby', async () => {
        const mockId = '123';
        const mockError = new Error('Deletion failed');
        HobbiesFileRepo.prototype.delete = jest
          .fn()
          .mockRejectedValue(mockError);

        const mockRequest: Request = {
          params: { id: mockId },
        } as unknown as Request;

        await controller.delete(mockRequest, mockResponse, jest.fn());

        expect(mockResponse.json).toHaveBeenCalledWith({});
      });
    });
  });
});
