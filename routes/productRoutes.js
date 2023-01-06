const router = require('express').Router();
const { json } = require('express');
const Product = require('../models/Product');
const User = require('../models/User');

//get products

router.get('/', async (req,res) =>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//create a product 

router.post('/', async (req,res) => {
    try {
        const {name, description, prince, category, img: pictures} = req.body;
        const product = await Product.create({name, description, prince, category, pictures});
        const products = await Product.find(products);
        res.status(201).json(products)
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//update a product 

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const {name, description, price, category, img: pictures} = req.body;
        const product = await Product.findByIdAndUpdate({name, description, price, category, pictures});
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// delete product 

router.delete('/:id', async (req,res) => {
    const {id} = req.params;
    const {user_id} = req.body;
    try {
        const user = User.findById(user_id);
        if(!user.isAdmin) return res.status(400).json('you are not allowed to delete a product');
        await Product.findByIdAndDelete(id);
        const products = Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//get a product by id and show its similar 

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const product = Product.findById(id);
        const similar = (await Product.find({category: product.category})).limit(5);
        res.status(200).json({product, similar});
    } catch (e) {
        res.status(400).send(e.message);
    }
});


module.exports = router;