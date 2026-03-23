import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
