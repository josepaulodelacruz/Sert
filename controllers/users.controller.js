const Product = require('../models/users.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send({ express: `You're now Connected!`});
};


// controllers/products.js
exports.user_create = function (req, res) {
    let product = new Product(
        {
            fName: req.body.fName,
            mName: req.body.mName,
            lName: req.body.lName,
            contact: req.body.contact,
            eMail: req.body.eMail,
            blk: req.body.blk,
            lot: req.body.lot,
            ph: req.body.ph,
            userName: req.body.userName,
            password: req.body.password
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

// controllers/products.controller.js
// exports.product_details = function (req, res) {
//     Product.findById(req.params.id, function (err, product) {
//         if (err) return next(err);
//         res.send(product);
//     })
// };