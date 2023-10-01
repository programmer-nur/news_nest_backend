import express from 'express';
import { NewsController } from './news.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth(), NewsController.insertIntoDb);
router.patch('/:id/create-like', auth(), NewsController.createLikeIntoDb);
router.patch('/:id/remove-like', auth(), NewsController.removeLikeIntoDb);
router.patch('/:id/create-comment', auth(), NewsController.createCommentIntoDb);
router.get('/:id', NewsController.getByIdFromDb);
router.get('/', NewsController.getAllFromDb);

export const NewsRoutes = router;
