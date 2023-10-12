import express from 'express';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
// import { ServiceController } from './service.controller';

const router = express.Router();

router.get('/', ServiceController.getAllService);

router.post(
  '/create-service',
  // validateRequest(UserValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.createService,
);
router.get(
  '/:id',

  ServiceController.getSingleService,
);
// router.delete(
//   '/:id',

//   ServiceController.deleteService,
// );
router.patch(
  '/update-service/:id',

  ServiceController.updateService,
);
export const ServiceRoutes = router;
