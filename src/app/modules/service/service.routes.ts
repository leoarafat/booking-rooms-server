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
router.put(
  '/:id/add-question',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.addQuestion,
);
router.put(
  '/:id/add-answer',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.addQuestionAnswer,
);
router.put(
  '/add-review/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.addReviewInService,
);
router.patch(
  '/update-service/:id',

  ServiceController.updateService,
);
export const ServiceRoutes = router;
