import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import moment from 'moment';
import mongoose from 'mongoose';
import Blog from './models/Blog.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Make moment available in all EJS templates
app.locals.moment = moment;

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Home – list all blogs, newest first
app.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.render('index.ejs', { blogs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading blogs');
    }
});

// New blog form
app.get('/new', (req, res) => {
    res.render('new.ejs');
});

// Create blog
app.post('/view', async (req, res) => {
    try {
        const { title, text } = req.body;
        const safeText = escapeHtml(text).replace(/\r?\n/g, '<br>');
        const blog = new Blog({ title, text: safeText });
        await blog.save();
        res.redirect(`/blog/${blog._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating blog');
    }
});

// View single blog
app.get('/blog/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send('Blog not found');
        res.render('view.ejs', { data: blog });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading blog');
    }
});

// Edit blog form
app.get('/edit/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send('Blog not found');
        res.render('edit.ejs', { data: blog, id: req.params.id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading blog');
    }
});

// Save edited blog
app.post('/edit/:id', async (req, res) => {
    try {
        const { title, text } = req.body;
        const safeText = escapeHtml(text).replace(/\r?\n/g, '<br>');
        await Blog.findByIdAndUpdate(req.params.id, { title, text: safeText });
        res.redirect(`/blog/${req.params.id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating blog');
    }
});

// Delete confirmation page
app.get('/delete/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send('Blog not found');
        res.render('delete.ejs', { data: blog, id: req.params.id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading blog');
    }
});

// Confirm delete
app.post('/delete/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting blog');
    }
});

// ── React Like API ──────────────────────────────────────────────────────────
app.post('/api/blogs/:id/like', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json({ likes: blog.likes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
