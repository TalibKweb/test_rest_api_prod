const express = require('express');
const router = express.Router();
let User = require('../models/users');
const checkAuthAdmin = require('../middleware/auth')



// >>>>>>>>>>>>>>>>> Find All - Users
router.get('/', async (req, res) => {
    // res.send('Hello Users!');
    try {
        // let all_users = await User.find();
        const all_users = await User.find({}).sort({ id: 1 });
        res.status(200).send(all_users)
    }
    catch (err) {
        console.log('err.message', err.message)
        res.json({ message: err.message });
    }
})

// >>>>>>>>>>>>>>>>> Find by Slug - Users
router.get('/:slug', async (req, res) => {
    try {
        // let single_user = await User.findOne({ id: req.params.id }); 
        let single_user = await User.findOne({ slug: req.params.slug });
        res.status(200).json(single_user)
    } catch (err) {
        console.log('err.message', err.message)
        res.json({ message: err.message });
    }
})

// >>>>>>>>>>>>>>>>> POST Single Data
router.post('/', checkAuthAdmin, async (req, res) => {

    let newUser = new User({
        id: parseInt(req.body.id),
        name: req.body.name,
        slug: req.body.slug,
        gender: req.body.gender
    })
    try {
        let saveUser = await newUser.save();
        res.status(201).json(saveUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
        // res.status(400).json({ message: err.message });
        console.log('err.message', err.message)
    }
});

// router.put('/:id', updateTask);


// Delete a User - Users
router.post('/delete', checkAuthAdmin, async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        const user = await User.findOneAndDelete({ id: id });
        if (!user) {
            return res.status(404).send('User not found')
        }

        res.send(`User with ID ${id} deleted successfully`);
    } catch (err) {
        res.status(500).send('Error deleting user');
        console.log('err.message', err.message)
    }
});

module.exports = router;
