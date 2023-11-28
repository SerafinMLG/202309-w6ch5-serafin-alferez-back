/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import createDebug from 'debug';
import { ImgData } from '../types/img.data.js';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('W8E:media-files')

export class MediaFiles {
  constructor() {
    cloudinary.config({
      cloud_name:'drv1kbmgi' ,
      api_key: '682145767354333' ,
      api_secret: 'ltzrN2IoZT3hMFcHJShLAn3YyFI' ,

      secure: true, 
       // Asegura de que las imágenes van con url seguras https
    });
    debug('Instance created')
  }

  async uploadImage(imagePath: string) {   // Esta funcion por ser asíncrona puede darnos un error
    try {
      const uploadApiResponse = await cloudinary.uploader.upload(imagePath, {
      use_filename: true,
      unique_filename: false,
      overwrite: true
   });

      const imgData: ImgData = {
        url: uploadApiResponse.url,
        publicId: uploadApiResponse.public_id,
        size: uploadApiResponse.bytes,
        height: uploadApiResponse.height,
        width: uploadApiResponse.width,
        format: uploadApiResponse.format   // El resto de datos que me proporciona no los necesito.
      }
      return imgData;
   } catch (err) {
      const error = (err as {error: Error}).error as Error  // Esto es una rareza de Cloudinary como gestiona los errores
      throw new HttpError(406, 'Not Acceptable', (error as Error).message);
    }
  }
}
// Ccloudinary.uploader.upload()    // Es el subidor de imágenes, un objeto, con muchos métodos como el upload
