'use strict'

const multiparty = require('multiparty');
var all = require('all-image')


var controller = {
    convertImage: (req,res) => {
        const form = new multiparty.Form()
        var imageI = req.headers['x-index'];
        var imageS = req.headers['x-subindex'];
        console.log(imageI, imageS)

        form.parse(req, (_, fields, files) => {
            var tempPath = files[Object.keys(files)][0].path;
            console.log()
            all.getDataUri(tempPath, (dataUri) => {
                return res.status(200).send({
                    status: 'success',
                    index: imageI,
                    subindex: imageS,
                    message: dataUri
                })
            })
            
        })
    }
};

module.exports = controller;