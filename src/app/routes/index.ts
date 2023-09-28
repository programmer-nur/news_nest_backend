import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { NewsRoutes } from '../modules/news/news.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/news',
    route: NewsRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
