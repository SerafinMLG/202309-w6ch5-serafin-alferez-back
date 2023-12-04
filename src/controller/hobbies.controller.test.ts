import { Request, Response } from 'express';
import { HobbiesMongoRepo } from '../repos/hobbies.mongo.repo.js';
import { HobbiesController } from './hobbies.controller.js';
import { HttpError } from '../types/http.error.js';


describe('Given UsersController class', () => {
  describe('When we instantiate it without errors', () => {
    test('should create a new hobbie with valid input data and image file', async () => {
      const mockRequest = {
        file: {
          path: 'valid/path/to/image.jpg',
        },
        body: {},
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      const mockParentCreate = jest.fn();
      const mockRepo = {
        create: mockParentCreate,
      } as unknown as HobbiesMongoRepo;
      const controller = new HobbiesController(mockRepo);
      const mockImageData = { url: 'https://example.com/image.jpg' };
      const mockCloudinaryService = {
        uploadImage: jest.fn().mockResolvedValue(mockImageData),
      };
      controller.cloudinaryService = mockCloudinaryService;
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockCloudinaryService.uploadImage).toHaveBeenCalledWith(
        mockRequest.file?.path
      );
      expect(mockRequest.body.picture).toBe(mockImageData);
      expect(mockParentCreate).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });
  describe('when we initiate WITH errors', () => {
    test('should return a 500 HttpError when an error occurs during hobbie creation', async () => {
      const mockRequest = {
        file: {
          path: 'valid/path/to/image.jpg',
        },
        body: {},
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      const mockParentCreate = jest
        .fn()
        .mockRejectedValue(new Error('Hobbie creation error'));
      const mockRepo = {
        create: mockParentCreate,
      } as unknown as HobbiesMongoRepo;
      const controller = new HobbiesController(mockRepo);
      const mockImageData = { url: 'https://example.com/image.jpg' };
      const mockCloudinaryService = {
        uploadImage: jest.fn().mockResolvedValue(mockImageData),
      };
      controller.cloudinaryService = mockCloudinaryService;
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockCloudinaryService.uploadImage).toHaveBeenCalledWith(
        mockRequest.file?.path
      );
      expect(mockRequest.body.picture).toBe(mockImageData);
      expect(mockParentCreate).toHaveBeenCalledWith(mockRequest.body);
      expect(mockNext).toHaveBeenCalledWith(
        new HttpError(500, 'Internal Server Error', 'Hobbie creation error')
      );
    });
    test('should call next with an instance of HttpError if no image file is provided', async () => {
      const mockRequest = {
        file: undefined,
        body: {},
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      const mockParentCreate = jest.fn();
      const mockRepo = {
        create: mockParentCreate,
      } as unknown as HobbiesMongoRepo;
      const controller = new HobbiesController(mockRepo);
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(expect.any(HttpError));
      expect(mockNext.mock.calls[0][0].status).toBe(406);
      expect(mockNext.mock.calls[0][0].statusMessage).toBe('Not Acceptable');
      expect(mockNext.mock.calls[0][0].message).toBe('Invalid multer file');
    });
  });
});
