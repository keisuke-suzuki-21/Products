const express = require('express');
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class ProductDB {
    constructor() {
      this.productNum = 0;
      this.products = [];
    }
  
    add(name, price) {
      this.products.push(new Product(this.productNum, name, price));
      this.productNum++;
    }
  }
  
  let foods = new ProductDB();
  foods.add("ポッキー", 280);
  foods.add("きのこの山", 190);
  foods.add("たけのこの里", 190);


app.get('/', (req, res) => {
  res.contentType('json');
  res.header('Access-Control-Allow-Origin', '*');
  res.send({result:foods.length, data:foods});  
});

app.get('/request', (req, res) => {
  let result = { err: "", result: 0, data: [] }
  const cmd = req.query.cmd;
  const name = req.query.name;
  res.contentType('json');
  res.header('Access-Control-Allow-Origin', '*');
  if (cmd === 'search' && name) {
    for(let i = 0; i < foods.products.length; i++){
      if(foods.products[i].name.includes(name)){
        result.result++;
        result.data.push(foods.products[i]);
      }
    }
    res.send(result);
  }else if(cmd === 'all'){
    res.send({result:foods.length, data:foods});
  }else{
    result.err = "search name not specified"
    res.send(result);
  }
});

app.get('/add', (req, res) => {
  const name = req.query.name;
  const price = req.query.price;
  res.contentType('json');
  res.header('Access-Control-Allow-Origin', '*');
  foods.add(name, price);
  res.send({result:foods.length, data:foods});
});

app.listen(PORT, HOST);  

