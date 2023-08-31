import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import Validations from '../middlewares/Validations';

const userController = new UsersController();

const router = Router();

// router.get('/', (req, res) => userController.getAllUsers(req, res));

// router.get('/:id', (req, res) => userController.getUserById(req, res));

router.get(
  '/role',
  Validations.validateToken,
  (req, res) => userController.getRoleByToken(req, res),
);

router.post(
  '/',
  Validations.validateUser,
  (req, res) => userController.login(req, res),
);

export default router;
