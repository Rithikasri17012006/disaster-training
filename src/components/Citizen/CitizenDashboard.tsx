import { useState } from 'react';
import { User, GraduationCap, Bell, AlertOctagon, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockTrainings, mockAlerts } from '../../data/mockData';
import TrainingsList from './TrainingsList';
import AlertsView from './AlertsView';
import SOSPanel from './SOSPanel';
import RequestsPanel from './RequestsPanel';

type TabType = 'trainings' | 'alerts' | 'sos' | 'requests';

export default function CitizenDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('trainings');

  const upcomingTrainings = mockTrainings.filter(t => t.status === 'upcoming').length;
  const activeAlerts = mockAlerts.filter(a => a.type === 'danger' || a.type === 'warning').length;

  const stats = [
    {
      label: 'Available Trainings',
      value: mockTrainings.filter(t => t.status === 'upcoming').length,
      icon: GraduationCap,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Active Alerts',
      value: activeAlerts,
      icon: Bell,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'My Trainings',
      value: 2,
      icon: GraduationCap,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Badges Earned',
      value: 3,
      icon: User,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  const tabs = [
    { id: 'trainings' as TabType, label: 'Trainings', icon: GraduationCap },
    { id: 'alerts' as TabType, label: 'Alerts', icon: Bell },
    { id: 'sos' as TabType, label: 'SOS', icon: AlertOctagon },
    { id: 'requests' as TabType, label: 'Requests', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Citizen Portal</h1>
                <p className="text-xs text-gray-500">Stay Safe, Stay Prepared</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Citizen</p>
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
                  <div className={`${stat.bg} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'trainings' && <TrainingsList />}
        {activeTab === 'alerts' && <AlertsView />}
        {activeTab === 'sos' && <SOSPanel />}
        {activeTab === 'requests' && <RequestsPanel />}
      </div>
    </div>
  );
}
