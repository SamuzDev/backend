import express from "express";
import Post, { IPost } from "./schema";
import multerUpload from '../../config/multer';

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Posts not found' });
    }
});

router.post('/', multerUpload.single('image'), async (req, res) => {
    const { content } = req.body;

    // if (!user_id || !content) {
    //     return res.status(400).json({ message: 'user_id and content are required' });
    // }

    try {
        const newPost: IPost = new Post({

            content,
            image: req.file? `${process.env.PROTOCOL || 'http'}://${process.env.HOST || 'localhost'}:${process.env.PORT ? process.argv[3] : 8080}/uploads/${req.file.filename}` : null
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post' });
    }
});

export default router;