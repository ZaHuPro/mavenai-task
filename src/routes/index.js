import { Router } from 'express';
import homeController from '@controllers/Home'

const router = Router();

router.get('/', homeController.welcome);


export default router;
