const express = require("express");

const app = express()

const morgan = require('morgan')
app.use(morgan('tiny'))

app.use(express.json())


const cors = require('cors')
app.use(cors())

require('dotenv').config();
const port = process.env.PORT;

const { Pool } = require("pg");
//console.log envirement variable

const bd = new Pool({
   
    host: "db",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
  });

var fs = require('fs');

var sql_create = fs.readFileSync('./sql/create.sql').toString();

bd.connect().then(() => {
    console.log('connected to db');
    bd.query(sql_create).then(() => {
        console.log('created table');
            app.listen(port, () => {
                console.log(`runinig on port ${port}`)
            })
    }).catch((err) => {
        console.log(err);
    });
   
}).catch((err) => {
    console.log(err);
})



module.exports = { bd };

app.get("/", (req, res) => {
   
    res.json("it works")

});

const drop = require('./sql/drop.js');
const insert = require('./sql/insert.js');
const create = require('./sql/create.js');

app.use("/insert", insert);
app.use("/drop", drop);
app.use("/create", create);
app.use("/parking", require("./routes/parking"));
app.use("/place", require("./routes/place"));
app.use("/auth", require("./routes/auth"));
app.use("/vehicule", require("./routes/vehicule"));
app.use("/reservation", require("./routes/reservation"));
app.use("/user", require("./routes/user"));
app.use("/occupation", require("./routes/occupation"));
app.use("/statistique", require("./routes/statistique"));
app.use("/commune", require("./routes/commune"));
