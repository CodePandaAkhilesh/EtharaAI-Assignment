import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api.js';

const Tasks = () => {
  const { user } = useSelector((state) => state.auth);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    project: '',
    assignedTo: '',
    dueDate: '',
    priority: 'Medium',
  });

  useEffect(() => {
    fetchTasks();
    if (user?.role === 'Admin') {
      fetchProjects();
      fetchUsers();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', newTask);
      setNewTask({
        title: '',
        description: '',
        project: '',
        assignedTo: '',
        dueDate: '',
        priority: 'Medium',
      });
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateStatus = async (taskId, status) => {
    try {
      await api.put(`/tasks/${taskId}`, { status });
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update task');
    }
  };

  const selectedProject = projects.find(
    (project) => project._id === newTask.project
  );

  const assignableUsers = selectedProject
    ? [selectedProject.createdBy, ...selectedProject.members].filter(Boolean)
    : users;

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-950 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Tasks
      </h1>

      {/* ================= CREATE TASK ================= */}
      {user?.role === 'Admin' && (
        <form
          onSubmit={handleCreateTask}
          className="mb-6 rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-xl border border-gray-200 dark:border-slate-700"
        >
          <h2 className="text-xl font-semibold text-slate-900 dark:text-gray-100 mb-6">
            Create Task
          </h2>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* LEFT */}
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
                required
              />

              <select
                value={newTask.project}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    project: e.target.value,
                    assignedTo: '',
                  })
                }
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-gray-100"
              >
                <option value="">Select project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <select
                value={newTask.assignedTo}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignedTo: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-gray-100"
              >
                <option value="">Unassigned</option>
                {assignableUsers.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name}
                  </option>
                ))}
              </select>

              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-gray-100"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            {/* RIGHT */}
            <div className="space-y-5 flex flex-col">
              <textarea
                placeholder="Task description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="h-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-gray-100"
              />

              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
                className="rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-gray-100"
              />

              <button className="w-full rounded-2xl bg-indigo-600 text-white py-3 hover:bg-indigo-700 transition">
                Create Task
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ================= TASK LIST ================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-gray-200 dark:border-slate-700"
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {task.title}
              </h3>
              <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
                {task.priority}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {task.description || 'No description'}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                Project: {task.project?.name || 'N/A'}
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                Assigned: {task.assignedTo?.name || 'Unassigned'}
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                Status: {task.status}
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                Due:{' '}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : 'None'}
              </div>
            </div>

            <select
              value={task.status}
              onChange={(e) =>
                handleUpdateStatus(task._id, e.target.value)
              }
              className="mt-4 w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-gray-100"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;