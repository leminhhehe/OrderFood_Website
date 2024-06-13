const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./configs/connectDB');
const routes = require('./routes'); // Import từ thư mục routes

dotenv.config({ path: './configs/.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối với cơ sở dữ liệu
connectDB();

// Khởi tạo các tuyến đường
routes(app); // Gọi hàm export từ routes/index.js

app.listen(5000, () => {
    console.log('listening on port 5000');
});
