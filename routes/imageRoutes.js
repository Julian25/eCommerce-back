const cloudinary = require('cloudinary');
const router = require('express').Router();
require('dotenv').config();

cloudinary.config({
    cloud_name: "dwvzkahxn",
    api_key: "291273377449257",
    api_secret: "U7z7JiUC0gGG-qydHDI6UCQQOIQ",
});

router.delete('/:public_id', async(req, res)=> {
    const {public_id} = req.params;
    try {
        await cloudinary.uploader.destroy(public_id);
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e.message)
    }
  })

module.exports = router;