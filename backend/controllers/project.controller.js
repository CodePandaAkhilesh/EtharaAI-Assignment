import Project from '../models/Project.js';

export const createProject = async (req, res, next) => {
  try {
    const { name, description, members } = req.body;
    const createdBy = req.user.id;

    const project = new Project({
      name,
      description,
      createdBy,
      members: members || [],
    });

    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const projects = await Project.find({
      $or: [
        { createdBy: userId },
        { members: userId },
      ],
    }).populate('createdBy', 'name email').populate('members', 'name email');

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const addMember = async (req, res, next) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
    }

    res.json({ message: 'Member added successfully', project });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (req, res, next) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    project.members = project.members.filter(id => id.toString() !== userId);
    await project.save();

    res.json({ message: 'Member removed successfully', project });
  } catch (error) {
    next(error);
  }
};