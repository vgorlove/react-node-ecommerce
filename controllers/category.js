const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) =>{
        if(err || !category) {
            return res.status(400).json({
                err: "Category does not exist"
             });
         }

         req.category = category;
         next();
    });
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.create = (req, res) => {
    // console.log("req.body", req.body);
    const category = new Category(req.body);
    category.save((err, data) => {
        if(err) {
            return res.status(400).json({
               err: errorHandler(err)
            });
        }

        res.json({
            data
        });
    });
};

exports.update = (req, res) => {
    console.log("req.category", req.category);
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) =>{
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
             });
         }

         res.json(data);
    });
};

exports.remove = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.remove((err, data) =>{
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
             });
         }

         res.json({
             message: "Category deleted"
         });
    });
    
};

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
             });
         }

         res.json(data);

    });
    
};