const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let mongoUrl = `mongodb://localhost:27017/catalog`; // local mongo

mongoose.connect(mongoUrl)
.then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

const app = express();

app.get("/", (req, res, next) => {
    return res.send("Hello from node");
});


app.use(bodyParser.json());


const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String
    },
    qty: {
        type: Number
    }
});

const product = mongoose.model('Product', productSchema);

app.post("/", (req, res, next) => {
    const products = new product(req.body);
    console.log(req.body);
    products
    .save()
    .then(product => {
        res.status(201).json({
            success: true,
            code: 201,
            data: product
        });
    })
    .catch(err => {
      console.log("failed to create");
      res.status(400).send({success: false});
    });
});

app.listen(3000, () => {
    console.log(`Server listen from 3000.....`);
});