const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
{
    
    name:{
        type:String,
        require:[true, "cannot be blank"]},
    email:{
        type:String,
        require:[true, "cannot be blank"]},
    image:{
        type:String,
        require:[true, "cannot be blank"]} 
},
{timestamps:true}
)

const Products = mongoose.model("Product", ProductSchema)
module.exports = Products;