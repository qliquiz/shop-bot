const fs = require('fs');

const data = fs.readFileSync('src/data.json', 'utf-8');
const products = JSON.parse(data);
console.log(products);
module.exports = products;