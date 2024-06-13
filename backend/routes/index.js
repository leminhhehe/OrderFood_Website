const categoryRouter = require('./categoryRouter');
const foodRouter = require('./foodRouter');
const accountRouter = require('./accountRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');

module.exports = (app) => {
    app.use('/api/categories', categoryRouter);
    app.use('/api/foods', foodRouter);
    app.use('/api/accounts', accountRouter);
    app.use('/api/cart', cartRouter);   
    app.use('/api/order', orderRouter);
};
