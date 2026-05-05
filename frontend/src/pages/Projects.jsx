import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [memberSelection, setMemberSelection] = useState({});
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchProjects();
    if (user?.role === 'Admin') {
      fetchUsers();
    }
  }, [user]);

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

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', newProject);
      setNewProject({ name: '', description: '' });
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create project');
    }
  };

  const handleAddMember = async (projectId) => {
    const userId = memberSelection[projectId];
    if (!userId) return;
    try {
      await api.post('/projects/add-member', { projectId, userId });
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add member');
    }
  };

  const handleRemoveMember = async (projectId, userId) => {
    try {
      await api.post('/projects/remove-member', { projectId, userId });
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to remove member');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
  Projects
</h1>

{user?.role === 'Admin' && (
  <form
    onSubmit={handleCreateProject}
    className="mb-6 rounded-3xl 
    bg-white dark:bg-slate-900 
    p-6 shadow-lg border border-gray-200 dark:border-slate-700"
  >
    <h2 className="text-xl font-semibold text-slate-900 dark:text-gray-100 mb-4">
      Create Project
    </h2>

    {/* Project Name */}
    <div className="mb-4">
      <input
        type="text"
        placeholder="Project Name"
        value={newProject.name}
        onChange={(e) =>
          setNewProject({ ...newProject, name: e.target.value })
        }
        className="w-full rounded-2xl border 
        border-slate-300 dark:border-slate-600 
        bg-white dark:bg-slate-800 
        px-4 py-3 
        text-slate-900 dark:text-gray-100 
        placeholder-gray-400 dark:placeholder-gray-500
        focus:border-indigo-500 focus:outline-none 
        focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500
        transition"
        required
      />
    </div>

    {/* Description */}
    <div className="mb-4">
      <textarea
        placeholder="Description"
        value={newProject.description}
        onChange={(e) =>
          setNewProject({ ...newProject, description: e.target.value })
        }
        className="w-full rounded-2xl border 
        border-slate-300 dark:border-slate-600 
        bg-white dark:bg-slate-800 
        px-4 py-3 
        text-slate-900 dark:text-gray-100 
        placeholder-gray-400 dark:placeholder-gray-500
        focus:border-indigo-500 focus:outline-none 
        focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500
        transition"
      />
    </div>

    {/* Button */}
    <button
      type="submit"
      className="bg-indigo-600 dark:bg-indigo-500 
      text-white px-5 py-2.5 rounded-2xl 
      hover:bg-indigo-700 dark:hover:bg-indigo-600
      active:scale-95 transition-all duration-150"
    >
      Create Project
    </button>
  </form>
)}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <div key={project._id} className="overflow-hidden rounded-3xl bg-white dark:bg-slate-800 p-6 shadow">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="break-words text-2xl font-semibold text-slate-900 dark:text-white">{project.name}</h3>
                <p className="mt-3 break-words text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Created by: {project.createdBy.name}</p>
              </div>
              <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
                {project.members.length + 1} team members
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Team Members</h4>
                <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm dark:bg-slate-800">
                    <span className="font-medium text-slate-900 dark:text-white">{project.createdBy.name} (Owner)</span>
                  </div>
                  {project.members.map((member) => (
                    <div key={member._id} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm dark:bg-slate-800">
                      <span>{member.name} ({member.role})</span>
                      {user?.role === 'Admin' && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(project._id, member._id)}
                          className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {user?.role === 'Admin' && (
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Add Member</h4>
                  <div className="mt-3 flex flex-col gap-3">
                    <select
                      value={memberSelection[project._id] || ''}
                      onChange={(e) => setMemberSelection({ ...memberSelection, [project._id]: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                      <option value="">Select user</option>
                      {users
                        .filter((u) => u.role === 'Member' && !project.members.some((m) => m._id === u._id) && u._id !== project.createdBy._id)
                        .map((member) => (
                          <option key={member._id} value={member._id}>{member.name} ({member.email})</option>
                        ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => handleAddMember(project._id)}
                      className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      Add Member
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;