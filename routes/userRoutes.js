const router = require('express').Router();
const User = require('../models/User');


//Sign up 

router.post('/signup', async(req, res) => {
    const {name, email, password} = req.body;
    try{
        const user = await User.create({name, email, password});
        res.json(user);
    } catch(e){
        if(e.code === 11000) return res.status(400).send('Email already exist');
        res.status(400).send(e.message);
    }
});

// Login

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        res.json(user);
    } catch (e) {
        return res.status(400).send(e.message);
    }
})

// get user that are not admins 

router.get('/', async(req,res) =>{
    try {
        const user = User.find({isAdmin: false}).populate('orders');
        res.json(user)
    } catch (e) {
        return res.status(400).send(e.message);
    }
})


module.exports = router;