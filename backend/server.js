const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'blog-posts.json');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
async function ensureDataDirectory() {
    const dataDir = path.dirname(DATA_FILE);
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
    
    // Initialize data file if it doesn't exist
    try {
        await fs.access(DATA_FILE);
    } catch {
        const initialData = [
            {
                id: '1',
                title: 'Welcome to My Blog',
                excerpt: 'This is the first post on my blog. I\'ll be sharing my thoughts on web development, AI, and technology.',
                content: '<p>Welcome to my blog! This is where I\'ll be sharing my thoughts, tutorials, and insights on web development, AI, and technology.</p><p>Stay tuned for more content!</p>',
                author: 'Akhilesh Bisht',
                publishedAt: new Date().toISOString(),
                readTime: 2,
                tags: ['Welcome', 'Introduction'],
                featured: true
            }
        ];
        await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
    }
}

// Helper function to read blog posts
async function readBlogPosts() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return [];
    }
}

// Helper function to write blog posts
async function writeBlogPosts(posts) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing blog posts:', error);
        return false;
    }
}

// Routes

// GET all blog posts
app.get('/api/blog', async (req, res) => {
    try {
        const posts = await readBlogPosts();
        // Sort by publishedAt descending (newest first)
        const sortedPosts = posts.sort((a, b) => 
            new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        res.json(sortedPosts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});

// GET single blog post by ID
app.get('/api/blog/:id', async (req, res) => {
    try {
        const posts = await readBlogPosts();
        const post = posts.find(p => p.id === req.params.id);
        
        if (!post) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        
        res.json(post);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ error: 'Failed to fetch blog post' });
    }
});

// POST create new blog post
app.post('/api/blog', async (req, res) => {
    try {
        const { title, excerpt, content, author, tags, featured } = req.body;
        
        if (!title || !excerpt || !content || !author) {
            return res.status(400).json({ 
                error: 'Missing required fields: title, excerpt, content, author' 
            });
        }
        
        const posts = await readBlogPosts();
        
        // Calculate read time (rough estimate: 200 words per minute)
        const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        
        const newPost = {
            id: Date.now().toString(),
            title,
            excerpt,
            content,
            author,
            publishedAt: new Date().toISOString(),
            readTime,
            tags: tags || [],
            featured: featured || false
        };
        
        posts.push(newPost);
        await writeBlogPosts(posts);
        
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});

// PUT update blog post
app.put('/api/blog/:id', async (req, res) => {
    try {
        const posts = await readBlogPosts();
        const postIndex = posts.findIndex(p => p.id === req.params.id);
        
        if (postIndex === -1) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        
        const { title, excerpt, content, author, tags, featured } = req.body;
        const existingPost = posts[postIndex];
        
        // Calculate read time if content changed
        let readTime = existingPost.readTime;
        if (content && content !== existingPost.content) {
            const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
            readTime = Math.max(1, Math.ceil(wordCount / 200));
        }
        
        posts[postIndex] = {
            ...existingPost,
            ...(title && { title }),
            ...(excerpt && { excerpt }),
            ...(content && { content }),
            ...(author && { author }),
            ...(tags !== undefined && { tags }),
            ...(featured !== undefined && { featured }),
            readTime
        };
        
        await writeBlogPosts(posts);
        res.json(posts[postIndex]);
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ error: 'Failed to update blog post' });
    }
});

// DELETE blog post
app.delete('/api/blog/:id', async (req, res) => {
    try {
        const posts = await readBlogPosts();
        const filteredPosts = posts.filter(p => p.id !== req.params.id);
        
        if (posts.length === filteredPosts.length) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        
        await writeBlogPosts(filteredPosts);
        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize and start server
async function startServer() {
    await ensureDataDirectory();
    
    app.listen(PORT, () => {
        console.log(`🚀 Blog API server running on http://localhost:${PORT}`);
        console.log(`📝 Blog posts stored at: ${DATA_FILE}`);
    });
}

startServer().catch(console.error);
