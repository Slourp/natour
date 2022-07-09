/**
* User [Users]
* check User [GET]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[User])
 * @param {*} req 
 * @param {*} res 
 */
export const checkUserId = async (req, res, next, val) => {
    if (false) return res.status(200).json({
        status: 'sucess',
        message: 'All good',
        items: [],
    })
    next()
}
/**
* User [Users]
* Retrieve All User [GET]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[User])
 * @param {*} req 
 * @param {*} res 
 */
export const getAllUsers = async (req, res) => {
    return res.json({ message: "oh noooon" })
    return res.status(200).json({
        status: 'sucess',
        message: 'All good',
        items: [],
    })
}

/**
* User [Users/:id]
* Retrieve All User [GET]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[User])
 * @param {*} req 
 * @param {*} res 
 */
export const getUserById = async (req, res) => {
    return res.status(200).json({
        status: 'sucess',
        message: 'All good',
        items: [],
    })
}

/**
* User [Users]
* Create User [GET]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[User])
 * @param {*} req 
 * @param {*} res 
 */
export const createUser = async (req, res) => {
    return res.status(200).json({
        status: 'sucess',
        message: 'All good',
        items: [],
    })
}

/**
* User [Users]
* Update User [PATCH]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[User])
 * @param {*} req 
 * @param {*} res 
 */
export const updateUser = async (req, res) => {
    return res.status(200).json({
        status: 'sucess',
        message: 'All good',
        items: [],
    })
}

/**
* User [Users]
* Delete User [DELETE]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[User])
 * @param {*} req 
 * @param {*} res 
 */
export const deleteUser = async (req, res) => {
    return res.status(200).json({
        status: 'sucess',
        message: 'All good',
        items: [],
    })
}