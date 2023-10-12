import express from 'express';
import { LayoutController } from './layouts.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
router.post(
  '/create-layout',

  auth(ENUM_USER_ROLE.ADMIN),
  LayoutController.createLayout,
);
router.put(
  '/update-layout',
  auth(ENUM_USER_ROLE.ADMIN),
  LayoutController.updateLayout,
);
router.get(
  '/get-layout/:type',

  LayoutController.getLayoutByType,
);

export const LayoutRoutes = router;
