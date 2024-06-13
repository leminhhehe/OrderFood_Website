const jwt = require('jsonwebtoken');
const Account = require('../models/accountModel');

// Middleware kiểm tra xác thực và phân quyền
const authenticateUser = async (req, res, next) => {
    try {
        // Lấy token từ header Authorization
        const token = req.headers.authorization.split(' ')[1];

        // Kiểm tra token
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Giải mã token và kiểm tra người dùng
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Account.findById(decodedToken.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Gán thông tin người dùng vào request
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware kiểm tra quyền truy cập của admin
const checkAdminAccess = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = { authenticateUser, checkAdminAccess };
