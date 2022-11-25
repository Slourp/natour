import catchAsync from '../Utils/CatchAsync.js';
import AppError from '../models/AppError.js';

import { google } from 'googleapis';
import axios from 'axios';

export const getDrive = catchAsync(async (req, res, next) => {
	axios.get('https://révoqué-rsa-dv.ssl.com', {}, {
		httpsAgent: new httpsAgent.Agent({
			rejectUnauthorized: false
		})
	})
		.then(rs => console.log('Success response:', rs))
		.catch(err => console.log('Error response:', err));

	console.log(response.status)

	return res.status(201).json({
		status: 'success',
		result: 0,
		data: [],
	})
})

/**
 * Create a folder and prints the folder ID
 * @return{obj} folder Id
 * */
// export const createFolder = async () => {
// 	// Get credentials and build service
// 	// TODO (developer) - Use appropriate auth mechanism for your app

// 	// const { google } = require('googleapis');

// 	const auth = new GoogleAuth(
// 		{
// 			scopes: 'https://www.googleapis.com/auth/drive',
// 		});

// 	const service = google.drive({ version: 'v3', auth });

// 	const fileMetadata = {
// 		name: 'Invoices',
// 		mimeType: 'application/vnd.google-apps.folder',
// 	};
// 	try {
// 		const file = await service.files.create({
// 			resource: fileMetadata,
// 			fields: 'id',
// 		});
// 		console.log('Folder Id:', file.data.id);
// 		return file.data.id;
// 	} catch (err) {
// 		// TODO(developer) - Handle error
// 		throw err;
// 	}
// }