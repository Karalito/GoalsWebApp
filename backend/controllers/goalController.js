const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

/**
 * @desc    Get User Matching Goals
 * @route   GET /api/goals
 * @access  Private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

/**
 * @desc    Post User Goal
 * @route   POST /api/goals
 * @access  Private
 */
const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({ text: req.body.text, user: req.user.id });

  res.status(201).json(goal);
});

/**
 * @desc    Update User Goal
 * @route   PUT /api/goals/:id
 * @param   {*} id
 * @access  Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  // Check for Goal
  if (!goal) {
    res.status(400);
    throw new Error('No goal found with provided id');
  }

  const user = await User.findById(req.user.id);

  // Check for User
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check if User matches Goal User
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

/**
 * @desc    Delete User Goal
 * @route   Delete /api/goal/:id
 * @param   {*} id
 * @access  Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('No goal found with provided id');
  }

  const user = await User.findById(req.user.id);

  // Check for User
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check if User matches Goal User
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  postGoal,
  updateGoal,
  deleteGoal,
};
