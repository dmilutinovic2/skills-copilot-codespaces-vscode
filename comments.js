// Create web server

// Import
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Import validation
const validateCommentInput = require('../../validation/comment');

// Import models
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

// @route   GET api/comments/test
// @desc    Test comments route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Comments works' }));

// @route   GET api/comments/all
// @desc    Get all comments
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};

    Comment.find()
        .populate('user', ['name', 'avatar'])
        .then(comments => {
            if (!comments) {
                errors.nocomments = 'There are no comments';
                return res.status(404).json(errors);
            }
            res.json(comments);
        })
        .catch(err => res.status(404).json({ comments: 'There are no comments' }));
});

// @route   GET api/comments/post/:post_id
// @desc    Get comments by post id
// @access  Public
router.get('/post/:post_id', (req, res) => {
    const errors = {};

    Comment.find({ post: req.params.post_id })
        .populate('user', ['name', 'avatar'])
        .then(comments => {
            if (!comments) {
                errors.nocomments = 'There are no comments for this post';
                return res.status(404).json(errors);
            }
            res.json(comments);
        })
        .catch(err =>
            res.status(404).json({ comments: 'There are no comments for this post' })
        );
});

// @route   GET api/comments/:id
// @desc    Get comment by id
// @access  Public
router.get('/:id', (req, res) => {
    const errors = {};

    Comment.findById(req.params.id)
        .populate('user', ['name', 'avatar'])
        .then(comment => {
            if (!comment) {
                errors.nocomment = 'There is no comment for this id';
                return res.status(404).json(errors);
            }
            res.json(comment);
        })
        .catch(err =>
            res.status(404).json