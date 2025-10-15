import { useState } from 'react';
import { MapPin, Bell, TrendingUp, Users, AlertTriangle, CheckCircle, Clock, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockDisasters, mockTrainings, mockCampaigns, mockAlerts, mockResilienceData, mockRequests } from '../../data/mockData';
import GISMap from './GISMap';
import AlertsPanel from './AlertsPanel';
import CampaignApprovals from './CampaignApprovals';
import ResilienceAnalytics from './ResilienceAnalytics';
import FundsDonations from "./FundsDonations"; // ⬅️ Import your new tab

type TabType = 'overview' | 'map' | 'alerts' | 'approvals' | 'analytics' | 'funds';


export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const stats = [
    {
      label: 'Active Disasters',
      value: mockDisasters.filter(d => d.status === 'active').length,
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'Ongoing Trainings',
      value: mockTrainings.filter(t => t.status === 'ongoing' || t.status === 'upcoming').length,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Active Campaigns',
      value: mockCampaigns.filter(c => c.status === 'active').length,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Pending Requests',
      value: mockRequests.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

const tabs = [
  { id: 'overview' as TabType, label: 'Overview', icon: BarChart3 },
  { id: 'map' as TabType, label: 'GIS Map', icon: MapPin },
  { id: 'alerts' as TabType, label: 'Alerts', icon: Bell },
  { id: 'approvals' as TabType, label: 'Approvals', icon: CheckCircle },
  { id: 'analytics' as TabType, label: 'Analytics', icon: TrendingUp },
  { id: 'funds' as TabType, label: 'Funds & Donations', icon: TrendingUp }, // ✅ New Tab
];


  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">Disaster Resilience Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.id}</p>
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
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            // Define a color for each tab when active
            const activeColors: Record<TabType, string> = {
              overview: "bg-blue-600 text-white",
              map: "bg-green-600 text-white",
              alerts: "bg-red-600 text-white",
              approvals: "bg-yellow-500 text-white",
              analytics: "bg-purple-600 text-white",
              funds: "bg-indigo-600 text-white",
            };
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? activeColors[tab.id]
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Disasters</h3>
                <div className="space-y-3">
                  {mockDisasters.slice(0, 3).map(disaster => (
                    <div key={disaster.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{disaster.name}</p>
                        <p className="text-sm text-gray-600">{disaster.location.name}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ?{
                        disaster.severity === 'critical' ? 'bg-red-100 text-red-700' :
                        disaster.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {disaster.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Coverage Gaps</h3>
                <div className="space-y-3">
                  {mockResilienceData
                    .filter(r => r.trainingCoverage < 50)
                    .map((region, index) => (
                      <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-100">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-semibold text-gray-900">{region.location}</p>
                          <span className="text-sm font-bold text-red-700">{region.trainingCoverage}%</span>
                        </div>
                        <div className="w-full bg-red-100 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full"
                            style={{ width: `?{region.trainingCoverage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {region.trainedPopulation.toLocaleString()} / {region.population.toLocaleString()} trained
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && <GISMap />}
        {activeTab === 'alerts' && <AlertsPanel />}
        {activeTab === 'approvals' && <CampaignApprovals />}
        {activeTab === 'analytics' && <ResilienceAnalytics />}
        {activeTab === 'funds' && <FundsDonations />}

      </div>
    </div>
  );
}
