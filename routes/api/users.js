const router = require("express").Router();
const userController = require ("../../controllers/usercontroller")

// matches with "/api/users"

router.route ("/")
    .get(userController.findAll)
    .post(userController, create);

// matches with "/api/"