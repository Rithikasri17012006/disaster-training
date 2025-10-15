import { useState } from 'react';
import { DollarSign, MapPin, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { mockCampaigns, mockResilienceData } from '../../data/mockData';

export default function CampaignsList() {
  const [filter, setFilter] = useState<'all' | 'before' | 'during' | 'after'>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState('');

  const activeCampaigns = mockCampaigns.filter(c => c.approved && c.status === 'active');
  const filteredCampaigns = filter === 'all'
    ? activeCampaigns
    : activeCampaigns.filter(c => c.phase === filter);

  const handleDonate = (campaignId: string) => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    alert(`Thank you for donating ??{donationAmount}! Transaction processing...`);
    setSelectedCampaign(null);
    setDonationAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Active Campaigns</h3>
          <div className="flex space-x-2">
            {['all', 'before', 'during', 'after'].map(phase => (
              <button
                key={phase}
                onClick={() => setFilter(phase as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ?{
                  filter === phase
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {phase === 'all' ? 'All' : phase.charAt(0).toUpperCase() + phase.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCampaigns.map(campaign => {
            const progress = (campaign.raisedAmount / campaign.targetAmount) * 100;
            const regionData = mockResilienceData.find(r => campaign.location.includes(r.location.split(',')[0]));

            return (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{campaign.title}</h4>
                    <div className="flex items-center space-x-2">
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
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">
                      {campaign.raisedAmount.toLocaleString()} / {campaign.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all"
                      style={{ width: `?{Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{progress.toFixed(0)}% funded</span>
                    <span>{(campaign.targetAmount - campaign.raisedAmount).toLocaleString()} to go</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{campaign.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(campaign.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {regionData && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-900">Region Resilience Index</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-600">Score</p>
                        <p className="font-bold text-gray-900">{regionData.score}/10</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Coverage</p>
                        <p className="font-bold text-gray-900">{regionData.trainingCoverage}%</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedCampaign === campaign.id ? (
                  <div className="space-y-3">
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="Enter amount (?)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      min="1"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDonate(campaign.id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        Confirm Donation
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCampaign(null);
                          setDonationAmount('');
                        }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedCampaign(campaign.id)}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Donate Now</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-bold mb-2">Micro-Donations Make Macro Impact</h4>
            <p className="text-blue-100 text-sm">
              Every dollar counts! Your contributions directly support disaster preparedness, emergency response,
              and recovery efforts. All donations are tracked on blockchain for complete transparency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
