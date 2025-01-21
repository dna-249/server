
const express  = require("express");
const multer   = require("multer");
const Port = process.env.PORT || 3000
const app = express()
const cors = require("cors");
const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://danamonuraa:bkJ1MVARzko9ldt9@dnaapi.hjo9y.mongodb.net/product?retryWrites=true&w=majority&appName=dnaApi").then(()=> console.log("connected to database")).catch(err => console.log(err))


app.use(cors())
app.use(express.json())

const Products = require("./models/product.model");


const storage = multer.diskStorage({ destination : "uploads/image",
                        filename:(req, file, cb)=> {
        cb(null, `${req.file.originalname}`)
      }})
app.use("/file", express.static("uploads/image"))
const upload = multer({storage:storage})
app.get("/",(req,res)=>{
    res.send("hello from back")
})

app.get('/api/users', async (req,res) =>{
    try{
        const product = await Products.find({})
        res.json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    } 
    
} )


app.post('/api/users',upload.single('file'),(req,res) => {
    Products.create({name:req.body.name, 
                     email:req.body.email,
                    })
                    
})



app.get("api/user/:id", async(req,res)=>{
    try{
    const {id} = req.params;
    const product = await Products.findById(id)
    res.status(200).json(product)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


app.put("api/users/:id", async(req,res)=>{
    try {
        const {id}=req.params
        const product = await Products.findByIdAndUpdate(id, req.body)
        res.status(200).json(product)
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})
app.listen(Port, ()=>{
    console.log("server is Running")
    
})