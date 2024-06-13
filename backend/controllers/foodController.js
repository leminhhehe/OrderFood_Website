const foodModel = require('../models/foodModel.js');

module.exports = {
    createFood: async(req, res) =>{
        const body = req.body;
        const newFood = await foodModel.create(body);
        return res.status(201).json(newFood);
    },
    getFoods: async(req, res) => {
        const category_id = req.query.category_id;
        const body_query = {};
        if (category_id){
            body_query.category_id = category_id;
        }
        const foods = await foodModel.find(body_query);
        return res.status(200).json(foods);
    },
    updateFood: async(req, res) => {
        const id = req.params.id;
        const body = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(id, body, {new: true});
        return res.status(200).json(updatedFood);

    },
    deleteFood: async(req, res) => {
        const id = req.params.id;
        const deleteFood = await foodModel.findByIdAndDelete(id);
        return res.status(200).json(deleteFood)
    }
}

