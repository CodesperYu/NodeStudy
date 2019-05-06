const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Set template
app.set('view engine', 'ejs');
app.set('views', 'views');

// Route Imports
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Controllers
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(5000);
