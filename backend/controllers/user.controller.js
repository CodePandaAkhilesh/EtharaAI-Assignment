import User from '../models/User.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, 'name email role');
    res.json(users);
  } catch (error) {
    next(error);
  }
};
