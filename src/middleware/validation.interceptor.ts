import { validate } from 'express-validation'
// Iimport { userJoiSchema } from '../entities/user'
export class ValidationInterceptor {   // Aquí decimos para qué casos queremos la validación, en ppio solo en el registro

  registerValidator() {   // Nos devuelve un middleware
    return validate({  // Como los datos vienen en el body, lo validamos
      body: userJoiSchema
    },
    {statusCode: 406},
    { abortEarly: false})
  };
}  // Ya solo nos quedaría colocar el interceptor en el lugar adecuado
