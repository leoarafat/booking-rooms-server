import express from 'express';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { validateRequest } from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validations';

const router = express.Router();

router.get('/', ServiceController.getAllService);

router.post(
  '/create-service',
  validateRequest(ServiceValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.createService,
);
router.post(
  '/addToCart',
  // validateRequest(ServiceValidation.create),
  auth(ENUM_USER_ROLE.USER),
  ServiceController.addToCart,
);
router.get('/cart', auth(ENUM_USER_ROLE.USER), ServiceController.getMyCart);
router.get(
  '/:id',

  ServiceController.getSingleService,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteService,
);
router.delete(
  '/:id/cart',
  auth(ENUM_USER_ROLE.USER),
  ServiceController.removeFromCart,
);
router.put(
  '/:id/add-question',
  auth(ENUM_USER_ROLE.USER),
  ServiceController.addQuestion,
);
router.put(
  '/:id/add-answer',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.addQuestionAnswer,
);
router.put(
  '/add-review/:id',
  auth(ENUM_USER_ROLE.USER),
  ServiceController.addReviewInService,
);
router.patch(
  '/update-service/:id',
  validateRequest(ServiceValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.updateService,
);
export const ServiceRoutes = router;
