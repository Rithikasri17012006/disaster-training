import { useState } from 'react';
import { Heart, TrendingUp, DollarSign, Image } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockCampaigns, mockDonations, mockResilienceData } from '../../data/mockData';
import CampaignsList from './CampaignsList';
import DonationHistory from './DonationHistory';
import ImpactDashboard from './ImpactDashboard';

type TabType = 'campaigns' | 'history' | 'impact';

export default function DonorDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('campaigns');

  const userDonations = mockDonations.filter(d => d.donorId === user?.id);
  const totalDonated = userDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalBeneficiaries = userDonations.reduce((sum, d) => sum + (d.impactProof?.beneficiaries || 0), 0);

  const stats = [
    {
      label: 'Total Donated',
      value: `30,${totalDonated}`,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Campaigns Supported',
      value: userDonations.length,
      icon: Heart,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'People Helped',
      value: totalBeneficiaries,
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Impact Proofs',
      value: userDonations.filter(d => d.impactProof).length,
      icon: Image,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  const tabs = [
    { id: 'campaigns' as TabType, label: 'Browse Campaigns', icon: Heart },
    { id: 'history' as TabType, label: 'Donation History', icon: DollarSign },
    { id: 'impact' as TabType, label: 'Impact Dashboard', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Donor Portal</h1>
                <p className="text-xs text-gray-500">Make a difference today</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Donor</p>
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
            const activeColors: Record<TabType, string> = {
              campaigns: "bg-red-600 text-white",
              history: "bg-green-600 text-white",
              impact: "bg-blue-600 text-white",
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

        {activeTab === 'campaigns' && <CampaignsList />}
        {activeTab === 'history' && <DonationHistory donations={userDonations} />}
        {activeTab === 'impact' && <ImpactDashboard donations={userDonations} />}
      </div>
    </div>
  );
}
