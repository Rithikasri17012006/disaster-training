import { useState } from 'react';
import { Briefcase, CheckSquare, Users, Link } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockTasks } from '../../data/mockData';
import TasksPanel from './TasksPanel';
import AttendancePanel from './AttendancePanel';
import TransparencyLedger from './TransparencyLedger';

type TabType = 'tasks' | 'attendance' | 'ledger';

export default function NGODashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('tasks');

  const userTasks = mockTasks.filter(t => t.assignedTo === user?.id);
  const completedTasks = userTasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = userTasks.filter(t => t.status === 'in-progress').length;
  const pendingTasks = userTasks.filter(t => t.status === 'pending').length;

  const stats = [
    {
      label: 'Total Tasks',
      value: userTasks.length,
      icon: Briefcase,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: CheckSquare,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckSquare,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: Briefcase,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
    },
  ];

  const tabs = [
    { id: 'tasks' as TabType, label: 'AI Tasks', icon: Briefcase },
    { id: 'attendance' as TabType, label: 'Attendance', icon: Users },
    { id: 'ledger' as TabType, label: 'Transparency', icon: Link },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NGO/Trainer Portal</h1>
                <p className="text-xs text-gray-500">Disaster Response Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.organizationId}</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`?{stat.bg} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ?{stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ?{
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'tasks' && <TasksPanel tasks={userTasks} />}
        {activeTab === 'attendance' && <AttendancePanel />}
        {activeTab === 'ledger' && <TransparencyLedger />}
      </div>
    </div>
  );
}
