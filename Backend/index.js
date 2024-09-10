import express, { request, response } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose"
import { Product } from './models/productmodel.js';
import cors from 'cors';

const app = express();
app.use(cors(
    {
        origin: ['*'],
        methods: ["POST", "GET"],
        credentials: true
    }
));

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (request, response) => {
    return response.status(234).send('welcome to my site')
});
app.get('/h', (request, response) => {
    response.json("Hello");
});


app.post('/productadd', async (request, response)=>{
    try{
        if(!request.body.pTitle){
            return response.status(400).send({
                message: 'send title also',
            });
        }
        const newProduct = {
            pTitle: request.body.pTitle,
            price: request.body.price,
            discount: request.body.discount,
            img1: request.body.img1,
            img2: request.body.img2,
            img3: request.body.img3,
            videoLink: request.body.videoLink,
            availableBool: request.body.availableBool
        };
        const product = await Product.create(newProduct);
        return response.status(201).send(product);
    }
    catch(error){
        console.log(error);
        response.status(500);
    }
});
app.get('/product', async (request, response)=>{
    try{
        const products = await Product.find({});
        return response.status(200).json(
        {
            count:products.length,
            data:products
        }    
        );
    }
    catch(error){
        console.log(error.message);
        response.status(500);
    }
});
app.get('/product/:id', async (request, response)=>{
    try{
        const { id } = request.params;
        const product = await Product.findById(id); 
        return response.status(200).json(product);
    }
    catch(error){
        console.log(error.message);
        response.status(500);
    }
});
 
mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("App connected to mongodb");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    })