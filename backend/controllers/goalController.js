const asyncHandler = require('express-async-handler');

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get goals' });
});

// @desc    Post Goal
// @route   POST /api/goals
// @access  Private
const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  res.status(200).json({ message: 'Create goal' });
});

// @desc    Update Goal
// @route   PUT /api/goals/:id
// @params  id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});

// @desc    Delete Goal
// @route   DELETE /api/goal/:id
// @params  id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  postGoal,
  updateGoal,
  deleteGoal,
};
