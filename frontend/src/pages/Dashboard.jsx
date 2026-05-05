// import React, { useEffect, useState } from 'react';
// import api from '../services/api.js';

// const Dashboard = () => {
//   const [stats, setStats] = useState({});

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await api.get('/dashboard');
//         setStats(response.data);
//       } catch (error) {
//         console.error('Failed to fetch dashboard stats', error);
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Tasks</h3>
//           <p className="text-2xl font-bold text-indigo-600">{stats.totalTasks || 0}</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Overdue Tasks</h3>
//           <p className="text-2xl font-bold text-red-600">{stats.overdueTasks || 0}</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tasks by Status</h3>
//           <ul className="mt-2">
//             {stats.tasksByStatus?.map((status) => (
//               <li key={status._id} className="text-sm text-gray-600 dark:text-gray-400">
//                 {status._id}: {status.count}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tasks per User</h3>
//           <ul className="mt-2">
//             {stats.tasksPerUser?.map((user) => (
//               <li key={user._id} className="text-sm text-gray-600 dark:text-gray-400">
//                 {user.name}: {user.count}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import {
  FiCheckSquare,
  FiAlertCircle,
  FiPieChart,
  FiUsers,
} from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Dashboard
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        
        {/* Total Tasks */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-md border border-gray-200 dark:border-slate-700">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Tasks
            </p>
            <h2 className="text-2xl font-bold text-indigo-600">
              {stats.totalTasks || 0}
            </h2>
          </div>
          <FiCheckSquare className="text-indigo-500 text-3xl" />
        </div>

        {/* Overdue */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-md border border-gray-200 dark:border-slate-700">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Overdue
            </p>
            <h2 className="text-2xl font-bold text-red-500">
              {stats.overdueTasks || 0}
            </h2>
          </div>
          <FiAlertCircle className="text-red-500 text-3xl" />
        </div>

        {/* Status */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-md border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Status
            </p>
            <FiPieChart className="text-indigo-500" />
          </div>

          {stats.tasksByStatus?.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {stats.tasksByStatus.map((s) => (
                <li
                  key={s._id}
                  className="flex justify-between text-slate-700 dark:text-slate-300"
                >
                  <span>{s._id}</span>
                  <span className="font-semibold">{s.count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No data</p>
          )}
        </div>

        {/* Users */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-md border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Users
            </p>
            <FiUsers className="text-indigo-500" />
          </div>

          {stats.tasksPerUser?.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {stats.tasksPerUser.map((u) => (
                <li
                  key={u._id || u.name}
                  className="flex justify-between text-slate-700 dark:text-slate-300"
                >
                  <span>{u.name}</span>
                  <span className="font-semibold">{u.count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No users</p>
          )}
        </div>
      </div>

      {/* ================= INSIGHTS ================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-gray-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Insights
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800">
            <FiCheckSquare className="text-indigo-500" />
            <span className="text-slate-700 dark:text-slate-300">
              Total tasks: <strong>{stats.totalTasks || 0}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800">
            <FiAlertCircle className="text-red-500" />
            <span className="text-slate-700 dark:text-slate-300">
              Overdue: <strong>{stats.overdueTasks || 0}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;