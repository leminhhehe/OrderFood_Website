const accountModel = require('../models/accountModel');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        try {
            console.log('Received register request', req.body);
            const body = req.body;
            const newAccount = await accountModel.create(body);
            return res.status(201).json(newAccount);
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error'
            });
        }
    },
    login: async (req, res) => {
        try {
            console.log('Received login request', req.body);
            const { username, password } = req.body;
            const account = await accountModel.findOne({ username });

            if (!account || account.password !== password) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Username or password is incorrect"
                });
            }

            // Tạo token
            const token = jwt.sign({ userId: account._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token, account });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error'
            });
        }
    },
    getAccounts: async (req, res) => {
        try {
            const accounts = await accountModel.find();
            return res.status(200).json(accounts);
        } catch (error) {
            console.error('Error fetching accounts:', error);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error'
            });
        }
    },
    deleteAccount: async (req, res) => {
        try {
            const { id } = req.params;
            const account = await accountModel.findByIdAndDelete(id);
            if (!account) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Account not found'
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'Account deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting account:', error);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error'
            });
        }
    }
};
