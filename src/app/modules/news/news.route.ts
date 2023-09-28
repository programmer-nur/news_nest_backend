import express from 'express';
import { NewsController } from './news.controller';

const router = express.Router();

router.post('/', NewsController.insertIntoDb);

export const NewsRoutes = router;
