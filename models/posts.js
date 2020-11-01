import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    caption: {type: String, required: false },
    user: String,
    image: String, 
    comments: [],
});

const posts = mongoose.model("posts", postSchema)

module.exports = posts