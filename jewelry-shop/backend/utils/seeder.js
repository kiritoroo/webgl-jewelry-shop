const Product = require('../models/product');
const productsData = require('../data/products');
const connectDatabase = require('../config/database');

const dotenv = require('dotenv')
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products are deleted');
        await Product.insertMany(productsData)
        console.log('All Products are added.')
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()