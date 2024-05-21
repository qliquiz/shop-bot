const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./date_base_pluto.bd');

let products = [];

db.all('SELECT * FROM goods', (err, rows) => {
    if (!err) products = rows;
    // console.log(products);
});

// Закрываем соединение с базой данных после завершения работы
db.close((err) => {
    // if (err) console.error(err);
    // else console.log('\n' + 'Соединение с базой данных закрыто.' + '\n');
});

// module.exports = products;
export default products;