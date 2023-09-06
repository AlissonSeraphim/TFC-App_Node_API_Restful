import { Router } from 'express';
// import Validations from '../middlewares/Validations';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/home',
  (req, res) => matchesController.getMatchesWithPoints(req, res),
);

export default router;
