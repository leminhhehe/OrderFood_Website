const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getAccounts,
    deleteAccount,
} = require("../controllers/accountController");

const { authenticateUser, checkAdminAccess } = require("../middleware/authMiddleware");

router.route('/')
    .get(authenticateUser, checkAdminAccess, getAccounts);

router.route("/login")
    .post(login);

router.route("/register")
    .post(register);

router.route('/:id')
    .delete(authenticateUser, checkAdminAccess, deleteAccount);

module.exports = router;
