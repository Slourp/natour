import { Router } from 'express';
import { UsersController } from '../controller/index.js';

const {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  checkUserId,
} = UsersController;

/**
 * All Users' Routes should be set up here
 */
const router = Router();

router.param('id', checkUserId);
router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
