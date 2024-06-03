const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');


const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));



//moved it below, so that first we connect to database and then the server
//app.listen(3000, () => {
    //console.log("Server is running on port 3000");
//});

//basic get request from the default browser page 
app.get('/', (req, res) => {
    res.send("Hello from NODE api");
});


//to create new elements and store them in mongodb
app.post('/api/products',async(req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message});

    }
});

//to view the created elements stored in mongodb
app.get('/api/products',async(req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products)

    }catch(error){
        res.status(500).json({message:error.message});
    }
});

//to view specific objects depending upon their id 
app.get('/api/produc/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    }catch(error){
        res.status(500).json({message:error.message});
    }

});

//to update product based on its id
app.put('/api/product/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //chk if product actually exists
        if(!product){
            return res.status(404).json({message:"product not found"});
        }
        //just rechecking and calling the updated product from the db
        const updateproduct = await Product.findById(id);
        res.status(200).json(updateproduct);

    }catch(error){
        res.status(500).json({message:error.message});
    }
});

//delete the product
app.delete('/api/product/:id', async(req,res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        //chk if product actually exists
        if(!product){
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json({message:"product deleted successfully"});

    }catch(error){
        res.status(500).json({message:error.message});
    }

});

//connecting the database to server using mongoose
mongoose.connect("mongodb+srv://admin:admin@backend.9wdwiiz.mongodb.net/node-API?retryWrites=true&w=majority&appName=backend")
.then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})
.catch(()=>{
    console.log("connection failed!");
})