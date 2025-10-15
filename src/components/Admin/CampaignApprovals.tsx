import { useState } from 'react';
import { CheckCircle, XCircle, DollarSign, Clock, Link } from 'lucide-react';
import { mockCampaigns } from '../../data/mockData';

export default function CampaignApprovals() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);

  const handleApprove = (campaignId: string) => {
    setCampaigns(campaigns.map(c =>
      c.id === campaignId ? { ...c, approved: true, status: 'active' as const } : c
    ));
  };

  const handleReject = (campaignId: string) => {
    setCampaigns(campaigns.filter(c => c.id !== campaignId));
  };

  const pendingCampaigns = campaigns.filter(c => !c.approved);
  const activeCampaigns = campaigns.filter(c => c.approved && c.status === 'active');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Pending Approvals</h3>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            {pendingCampaigns.length} Pending
          </span>
        </div>

        {pendingCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">All campaigns reviewed</p>
            <p className="text-sm text-gray-500">No pending approvals at this time</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingCampaigns.map(campaign => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{campaign.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        campaign.phase === 'before' ? 'bg-blue-100 text-blue-700' :
                        campaign.phase === 'during' ? 'bg-red-100 text-red-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {campaign.phase.toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        campaign.urgency === 'critical' ? 'bg-red-100 text-red-700' :
                        campaign.urgency === 'high' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {campaign.urgency.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{campaign.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Target Amount</p>
                        <p className="font-semibold text-gray-900">${campaign.targetAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{campaign.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Category</p>
                        <p className="font-semibold text-gray-900">{campaign.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(campaign.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve Campaign</span>
                  </button>
                  <button
                    onClick={() => handleReject(campaign.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Active Campaigns - Blockchain Ledger</h3>
        <div className="space-y-4">
          {activeCampaigns.map(campaign => (
            <div key={campaign.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{campaign.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{campaign.location}</p>
                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-gray-900">
                        ${campaign.raisedAmount.toLocaleString()} / ${campaign.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">
                        Ends {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all"
                      style={{ width: `${(campaign.raisedAmount / campaign.targetAmount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Blockchain Transaction Hash</p>
                    <p className="font-mono text-sm text-gray-900">0x{campaign.id.toLowerCase()}abc123def456</p>
                  </div>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm font-medium">
                    <Link className="w-4 h-4" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
