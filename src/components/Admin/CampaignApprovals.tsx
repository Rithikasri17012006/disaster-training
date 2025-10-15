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

        {/* Community Preparedness Campaign Card */}
        <div className="border border-blue-200 rounded-lg p-6 mb-6 bg-blue-50">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-lg font-bold text-blue-900">Community Preparedness Campaign</h4>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700">PREPAREDNESS</span>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">MEDIUM</span>
          </div>
          <p className="text-gray-700 mb-3">
            Help local communities get ready for disaster response with training, drills, and resources.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500">Target Amount</p>
              <p className="font-semibold text-gray-900">?25,000</p>
            </div>
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-semibold text-gray-900">Pan India</p>
            </div>
            <div>
              <p className="text-gray-500">Category</p>
              <p className="font-semibold text-gray-900">Preparedness</p>
            </div>
            <div>
              <p className="text-gray-500">Duration</p>
              <p className="font-semibold text-gray-900">15 Oct 2025 - 30 Nov 2025</p>
            </div>
          </div>
          <div className="flex space-x-3 pt-2">
            <button
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Accept</span>
            </button>
            <button
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject</span>
            </button>
          </div>
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
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ?{
                        campaign.phase === 'before' ? 'bg-blue-100 text-blue-700' :
                        campaign.phase === 'during' ? 'bg-red-100 text-red-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {campaign.phase.toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ?{
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
                        <p className="font-semibold text-gray-900">?{campaign.targetAmount.toLocaleString()}</p>
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

    
    </div>
  );
}
