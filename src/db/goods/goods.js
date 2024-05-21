const fs = require('fs');
const dbPath = '/Users/artemgorev/date_base_pluto.bd';
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(dbPath);


db.all('SELECT * FROM goods WHERE count > 0', (err, rows) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        const productsJSON = JSON.stringify(rows);
        fs.writeFileSync('src/db/goods/goods.json', productsJSON);
    }
});


db.close((err) => {
    if (err) console.error(err);
    else console.log('\n' + 'Соединение с базой данных закрыто.' + '\n');
});