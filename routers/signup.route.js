import express from 'express';
import {checkLogin} from '../middlewares/signupmiddelware.js'
import {getSignup , getLogin , getHome , postSignup,postLogin,getLogout} from '../controllers/signup.controller.js'
const router = express.Router();

router.get('/signup',getSignup);
router.get('/login',getLogin);
router.get('/',checkLogin,getHome);
router.post('/signup',postSignup);
router.post('/login',postLogin);
router.get('/logout',getLogout)

export default router;