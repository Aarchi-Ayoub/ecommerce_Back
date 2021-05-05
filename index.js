// Import the packages
const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
var cors = require('cors')
//Config App
require('dotenv').config();
const app = express();

// Import the router
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const braintreeRouter = require('./routes/braintree');
// Get access to environment variables
require('dotenv').config();

// Import the value from .env
const port  = process.env.PORT || 3000;
const db    = process.env.DATABASE;

// Get the status and timeout of the request HTTP
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
}

/* Middlewars space */
// Convert the request body to Json form
app.use(express.json());
// Use the Express Validator
app.use(expressValidator());
// Use the cookie parser
app.use(cookieParser());
// 
app.use(cors());
// Use the routes middlewars
app.use('/api',authRouter);
app.use('/api',userRouter);
app.use('/api/categories',categoryRouter);
app.use('/api/products',productRouter);
app.use('/api/braintree',braintreeRouter);
// Config the database
mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
            }).then(()=>console.log('Connect to database'))
            .catch(()=>console.log('Can not connect to database'));

// Run the application 
app.listen(port,()=>console.log('Listen at the port'+port));