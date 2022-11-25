/**
 * All Natours' Routes should be set up here
 */

import { Router } from 'express';
import { GoogleDriveController } from '../controller/index.js';

const { getDrive, createFolder } = GoogleDriveController;

const router = Router();

router.route('/')
	.get(getDrive);


// router.route('/createFolder')
// 	.get(createFolder);



export default router;
