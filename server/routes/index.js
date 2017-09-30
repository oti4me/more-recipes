import express from 'express';
import index from './controlles/index';

const router = express.Router();

/* GET users listing. */
router.get('/', index);

export default router;

// /* GET users */ router.get('/', (req, res, next) => { 	res.json({ message:
// 'Users page' }); } router.get('/', (req, res, next) => { 	res.json({ message:
// 'Users page' }); }
