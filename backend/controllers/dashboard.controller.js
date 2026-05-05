import Task from '../models/Task.js';
import mongoose from 'mongoose';

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // ✅ Convert string → ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // ✅ Total Tasks
    const totalTasks = await Task.countDocuments({
      $or: [
        { assignedTo: userObjectId },
        { createdBy: userObjectId },
      ],
    });

    // ✅ Tasks By Status
    const tasksByStatus = await Task.aggregate([
      {
        $match: {
          $or: [
            { assignedTo: userObjectId },
            { createdBy: userObjectId },
          ],
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // ✅ Overdue Tasks
    const overdueTasks = await Task.countDocuments({
      $or: [
        { assignedTo: userObjectId },
        { createdBy: userObjectId },
      ],
      dueDate: { $lt: new Date() },
      status: { $ne: 'Done' },
    });

    // ✅ Tasks Per User (IGNORE NULL assignedTo)
    const tasksPerUser = await Task.aggregate([
      {
        $match: {
          $or: [
            { assignedTo: userObjectId },
            { createdBy: userObjectId },
          ],
          assignedTo: { $ne: null }, // ✅ remove unassigned tasks
        },
      },
      {
        $group: {
          _id: '$assignedTo',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users', // ⚠️ change to 'user' if your collection name is singular
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user', // no need for preserveNull now
      },
      {
        $project: {
          name: '$user.name',
          count: 1,
        },
      },
    ]);

    res.json({
      totalTasks,
      tasksByStatus,
      overdueTasks,
      tasksPerUser,
    });

  } catch (error) {
    next(error);
  }
};