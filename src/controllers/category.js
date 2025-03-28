const Category = require('../models/category');

exports.createCategory = (req, res, next) => {
    const category = new Category({
        ...req.body.category
    });
    category.save()
    .then(() => res.status(201).json({ message: 'Category created !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllCategory = (req, res, next) => {
    Category.find()
    .then((categories) => res.status(200).json({ categories }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneCategory = (req, res, next) => {
    Category.findOne({ _id: req.params.id })
    .then((category) => res.status(200).json({ category }))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteOneCategory = (req, res, next) => {
    Category.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Category deleted' }))
    .catch((error) => res.status(404).json({ error }));
};