import Task from '../models/Task.js';

export const createTask = async (req, res, next) => {
  try {
    const { title, description, assignedTo, project, dueDate, priority } = req.body;
    const createdBy = req.user.id;

    if (!title || !project) {
      return res.status(400).json({ message: 'Title and project are required' });
    }

    const task = new Task({
      title,
      description,
      assignedTo,
      project,
      dueDate,
      priority: priority || 'Medium',
      createdBy,
    });

    await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({
      $or: [
        { assignedTo: userId },
        { createdBy: userId },
      ],
    }).populate('assignedTo', 'name email').populate('project', 'name').populate('createdBy', 'name email');

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const isAssignedUser = task.assignedTo && task.assignedTo.toString() === req.user.id;
    const isCreator = task.createdBy.toString() === req.user.id;

    if (!isAssignedUser && !isCreator) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (status) {
      task.status = status;
    }

    await task.save();

    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(id);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};