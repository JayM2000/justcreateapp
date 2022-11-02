const express = require('express');
const app = express();
const path = require('path');
const val = require('./mongoconnection/mongos.js');
val();

// const bodyParser = require('body-parser');
const cors = require('cors');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

app.use(express.json());

app.use(cors({credentials:true,origin:"https://starlit-malasada-df2b99.netlify.app"}));

app.use('/rout',require('./routes/routes_user'));
app.use('/routpost',require('./routes/post'));
// app.use(cors());

app.get("/",(req,res)=>{
  res.json("server start")
})

// SERVER PUSHING TO HEROKU
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'));
//     app.get('*',(req,res) => {
//       res.sendFile(path.resolve(__dirname,'client','build','index.html'));
//     });
//   }

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('server is running....');
})