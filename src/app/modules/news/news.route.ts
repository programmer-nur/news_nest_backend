import express from 'express';
import { NewsController } from './news.controller';

const router = express.Router();

router.post('/', NewsController.insertIntoDb);
router.post('/', NewsController.getAllFromDb);

export const NewsRoutes = router;
