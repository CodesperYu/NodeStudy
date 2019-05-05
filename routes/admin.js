const express = require('express');

const router = express.Router();

const path = require('path')

router.use('/add-product', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
  // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});


module.exports = router;