const   mongoose = require('mongoose')

let projectModel = new mongoose.Schema({

        
       
        title: {type: String},
        desc: {type: String},
        author: {type: String},
        _links:{href:{type: String}}

        },{ collection: 'items' })

module.exports = mongoose.model('Project', projectModel)