import express from 'express';
import { LayoutController } from './layouts.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
router.get('/blog', LayoutController.getBlog);
router.post(
  '/create-layout',

  auth(ENUM_USER_ROLE.ADMIN),
  LayoutController.createLayout,
);
router.post(
  '/create-blog',

  auth(ENUM_USER_ROLE.ADMIN),
  LayoutController.createBlog,
);
router.put(
  '/update-layout',
  auth(ENUM_USER_ROLE.ADMIN),
  LayoutController.updateLayout,
);
router.put(
  '/update-blog/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  LayoutController.updateBlog,
);
router.get(
  '/get-layout/:type',

  LayoutController.getLayoutByType,
);
router.get(
  '/blog/:id',

  LayoutController.getBlogById,
);
router.delete(
  '/blog/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  LayoutController.deleteBlog,
);

export const LayoutRoutes = router;
