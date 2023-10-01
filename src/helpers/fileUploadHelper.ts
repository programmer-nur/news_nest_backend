import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import multer from 'multer';
import { ICloudinaryResponse, IFileUpload } from '../interfaces/fileUpload';

cloudinary.config({
  cloud_name: 'dpwxkekm5',
  api_key: '457593972445229',
  api_secret: '1K1OvbHD06xBU2uf5eJ-qQtOQSg',
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = (
  file: IFileUpload
): Promise<ICloudinaryResponse> => {
  return new Promise((resolve, rejects) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          rejects(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const FileUploadHelper = { uploadToCloudinary, upload };
