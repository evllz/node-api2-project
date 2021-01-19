const express = require('express');
const router = express.Router();
const dbHelpers = require('../db-helpers');

router.get('/', async (req, res) => {
	try {
		const posts = await dbHelpers.find();
		res.status(200).json(posts);
	} catch {
		res
			.status(500)
			.json({ errorMessage: 'The posts information could not be retrieved.' });
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const post = await dbHelpers.findById(id);
		if (!post) {
			res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist.' });
		} else {
			res.status(200).json(post);
		}
	} catch {
		res
			.status(500)
			.json({ error: 'The post information could not be retrieved.' });
	}
});

router.get('/:id/comments', async (req, res) => {
	const id = req.params.id;
	try {
		const post = await dbHelpers.findCommentById(id);
		if (!post) {
			res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist.' });
		} else {
			res.status(200).json(post);
		}
	} catch {
		res
			.status(500)
			.json({ error: 'The comments information could not be retrieved.' });
	}
});

router.post('/', async (req, res) => {
	const newPost = req.body;
	try {
		if (!newPost.title || !newPost.contents) {
			res.status(400).json({
				errorMessage: 'Please provide title and contents for the post.',
			});
		} else {
			const post = await dbHelpers.insert(newPost);
			res.status(201).json(post);
		}
	} catch {
		res.status(500).json({
			error: 'There was an error while saving the post to the database',
		});
	}
});

router.post('/:id/comments', async (req, res) => {
	const newComment = req.body;
	try {
		if (!newComment) {
			res.status(400).json({
				errorMessage: 'Please provide text for the comment.',
			});
		} else {
			const comment = await dbHelpers.insertComment(newComment);
			res.status(201).json(comment);
		}
	} catch {
		res.status(500).json({
			error: 'There was an error while saving the post to the database',
		});
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		if (!id) {
			res.status(404).json({
				message: 'The post with the specified ID does not exist.',
			});
		} else {
			const deletedPost = await dbHelpers.remove(id);
			res.status(201).json(deletedPost);
		}
	} catch {
		res.status(500).json({
			error: 'The post could not be removed',
		});
	}
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const updatedPost = req.body;
	try {
		if (!id) {
			res.status(404).json({
				errorMessage: 'The post with the specified ID does not exist.',
			});
		} else if (!updatedPost.title || !updatedPost.contents) {
			res.status(400).json({
				errorMessage: 'Please provide title and contents for the post.',
			});
		} else {
			const post = await dbHelpers.insert(newPost);
			res.status(201).json(post);
		}
	} catch {
		res.status(500).json({
			error: 'There was an error while saving the post to the database',
		});
	}
});

module.exports = router;
