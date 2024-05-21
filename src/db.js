const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('src/date_base_pluto.bd');
const fs = require('fs');


db.all('SELECT * FROM goods', (err, rows) => {
    if (!err) {
        console.log(rows);
        const productsJSON = JSON.stringify(rows);
        fs.writeFileSync('src/data.json', productsJSON);
    }
});


db.close((err) => {
    if (err) console.error(err);
    else console.log('\n' + 'Соединение с базой данных закрыто.' + '\n');
});