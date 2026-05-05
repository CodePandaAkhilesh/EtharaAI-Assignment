import express from 'express';
import { createProject, getProjects, addMember, removeMember } from '../controllers/project.controller.js';
import isAuth from '../middlewares/isAuth.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/', isAuth, roleMiddleware(['Admin']), createProject);
router.get('/', isAuth, getProjects);
router.post('/add-member', isAuth, roleMiddleware(['Admin']), addMember);
router.post('/remove-member', isAuth, roleMiddleware(['Admin']), removeMember);

export default router;