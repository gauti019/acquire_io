const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
    user_name: { type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type:Number, required: true},
    timestamp: { type: Date, required: true },
    debug_crtd_on: { type: Date, default: Date.now },    
},
    {
        collection: 'posts'
    });


module.exports = mongoose.model('Post', Post);
