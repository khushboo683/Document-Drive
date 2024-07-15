import express from 'express';
import {check} from 'express-validator';
import { register,login } from '../controllers/authControllers.js';
const router = express.Router();

router.post('/register',
    check('firstName')
    .notEmpty()
    .isString(),
    check('lastName')
    .notEmpty()
    .isString(),
    check('email')
    .notEmpty()
    .isEmail(),
    check('password')
    .notEmpty()
    .isString(),
    register);
router.post('/login',
    check('email')
    .notEmpty()
    .isEmail(),
    check('password')
    .notEmpty()
    .isString(),
    login);

export default router;