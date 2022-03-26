const ctrl = {};

ctrl.index = (req, res) => {
    
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    console.log(req.headers);

    res.status(200).json({title: 'Todo esta bien'});
}

module.exports = ctrl;