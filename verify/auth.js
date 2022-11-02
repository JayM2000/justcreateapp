const jwt = require('jsonwebtoken');

const verifytk = (req, res, next) => {
    // const ck = req.headers.cookie;
    // if (!ck) {
    //     res.status(500).send({ mess: 'No token ....' });
    // }
    // const headers = ck.split("=")[1];

    // const heads = req.headers['authorization'].split(" ")[1];
    const heads = req.headers['authorization'];
    // console.log(`from bakend token -> ${heads}`);

    jwt.verify(String(heads), 'shubh', (err, data) => {
        if (err) {
           return res.json({mess:err,st:'not'});
        }
        else {
            req.id = data.id;
            req.tk = heads;
            next();
        }
    });
};

module.exports = verifytk;