import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller.js';
import isAuth from '../middlewares/isAuth.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/', isAuth, roleMiddleware(['Admin']), createTask);
router.get('/', isAuth, getTasks);
router.put('/:id', isAuth, updateTask);
router.delete('/:id', isAuth, roleMiddleware(['Admin']), deleteTask);

export default router;