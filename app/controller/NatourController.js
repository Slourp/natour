import { login } from "../api/catalogueNeo9/catalogueNeo9SDK.js";
import { beautifulStringify } from "../helper/beautiful.js";
import to from "../helper/to.js";



// export const index = async (req, res) => {

//     const [error, result] = await to(login())
//     console.log(beautifulStringify(error, result))
//     return error ?
//         res.status(400).json(error) :
//         res.status(200).json(result.data)
// };


/**
* Tour [tours]
* Retrieve All Tour [GET]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[Tour])
 * @param {*} req 
 * @param {*} res 
 */
export const getAllTours = async (req, res) => { }

/**
* Tour [tours/:id]
* Retrieve All Tour [GET]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[Tour])
 * @param {*} req 
 * @param {*} res 
 */
export const getTourById = async (req, res) => { }

/**
* Tour [tours]
* Create Tour [GET]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[Tour])
 * @param {*} req 
 * @param {*} res 
 */
export const createTour = async (req, res) => { }

/**
* Tour [tours]
* Update Tour [PATCH]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[Tour])
 * @param {*} req 
 * @param {*} res 
 */
export const updateTour = async (req, res) => { }

/**
* Tour [tours]
* Delete Tour [DELETE]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[Tour])
 * @param {*} req 
 * @param {*} res 
 */
export const deleteTour = async (req, res) => { }