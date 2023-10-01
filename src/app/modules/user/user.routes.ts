import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/login', UserController.loginUser);
router.patch('/addToBookmark', auth(), UserController.addToBookmarkList);
router.post(
  '/create-user',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createUser.parse(JSON.parse(req.body.data));
    return UserController.createUser(req, res, next);
  }
);

export const UserRoutes = router;
