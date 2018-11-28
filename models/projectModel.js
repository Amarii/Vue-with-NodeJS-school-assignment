const   mongoose = require('mongoose'),
        mongoosePaginate = require('mongoose-paginate')

let projectModel = new mongoose.Schema({



        title: {type: String, required: true},
        desc: {type: String, required: true},
        author: {type: String, required: true},
        _links:{self: {href:{type: String, required: true}},
                collection: {href:{type:String, required: true}}}

        },{ collection: 'items' })

projectModel.plugin(mongoosePaginate)


module.exports = mongoose.model('Project', projectModel)

















