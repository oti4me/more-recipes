import express from 'express';
import index from './controlles/index';

const router = express.Router();

/* GET users listing. */
router.get('/', index);

export default router;

