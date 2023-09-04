import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validations';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllTeams(req, res));
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

export default router;
