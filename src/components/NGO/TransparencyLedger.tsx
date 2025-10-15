import { Link, DollarSign, CheckCircle, TrendingUp } from 'lucide-react';
import { mockCampaigns, mockDonations } from '../../data/mockData';

export default function TransparencyLedger() {
  const activeCampaigns = mockCampaigns.filter(c => c.approved && c.status === 'active');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Link className="w-6 h-6" />
          <h3 className="text-xl font-bold">Blockchain Transparency Ledger</h3>
        </div>
        <p className="text-purple-100">
          All donations and fund allocations are recorded on blockchain for complete transparency and donor trust.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Funds Raised</p>
          <p className="text-3xl font-bold text-gray-900">
            {activeCampaigns.reduce((sum, c) => sum + c.raisedAmount, 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Verified Transactions</p>
          <p className="text-3xl font-bold text-gray-900">{mockDonations.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Campaigns</p>
          <p className="text-3xl font-bold text-gray-900">{activeCampaigns.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Campaign Fund Tracking</h3>
        <div className="space-y-4">
          {activeCampaigns.map(campaign => {
            const campaignDonations = mockDonations.filter(d => d.campaignId === campaign.id);
            const progress = (campaign.raisedAmount / campaign.targetAmount) * 100;

            return (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{campaign.title}</h4>
                    <p className="text-sm text-gray-600">{campaign.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ?{
                    progress >= 100 ? 'bg-green-100 text-green-700' :
                    progress >= 75 ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {progress.toFixed(0)}% funded
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Funding Progress</span>
                    <span className="font-semibold text-gray-900">
                      ₹{campaign.raisedAmount.toLocaleString()} / ₹{campaign.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                      style={{ width: `${Math.min((campaign.raisedAmount / campaign.targetAmount) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Blockchain Records</h5>
                  <div className="space-y-2">
                    {campaignDonations.map(donation => (
                      <div key={donation.id} className="flex items-center justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-mono text-xs text-gray-700">{donation.transactionHash}</p>
                          <p className="text-xs text-gray-500">{new Date(donation.date).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-green-600">?{donation.amount.toLocaleString()}</span>
                          <button className="p-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                            <Link className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Transaction Hash</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Campaign</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockDonations.map(donation => {
                const campaign = mockCampaigns.find(c => c.id === donation.campaignId);
                return (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm text-gray-700">{donation.transactionHash}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{campaign?.title}</td>
                    <td className="py-3 px-4 text-right font-semibold text-green-600">{donation.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{new Date(donation.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                        Verified
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
