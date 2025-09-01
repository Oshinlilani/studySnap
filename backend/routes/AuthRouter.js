import express, { Router } from 'express'
import { loginValidation, signupValidation } from '../middleware/Authvalidation.js';
import { login, signup } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/signup', signupValidation, signup);

router.post('/login', loginValidation, login);

export default router;