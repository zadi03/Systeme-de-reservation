const express = require('express');
const Route = express.Router();


const indexControllers=require('../controlleurs/indexController')

Route.post('/',indexControllers.restau);


module.exports=Route;


