const fs = require('fs');
const path = require('path');

const ctrl = {};

ctrl.saveType = (req, res) => {
    let types = fs.readFileSync(path.join(__dirname,'..','data','biddingtypes.txt'), 'utf8')
                                .toString().split("\r\n");
    console.log(types);
    res.status(200).json(types)
}

module.exports = ctrl;