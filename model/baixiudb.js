const mysql = require("mysql");
module.exports.myQuery = (strSql, callback) =>
{
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "021509070235",
        database: "baixiu"
    });
    connection.connect();
    connection.query(strSql, (err, results) =>
    {
        if (err)
            callback(err, null);
        else
            callback(null, results);
    });
    connection.end();
}