import { Link, CheckCircle } from 'lucide-react';
import { Donation } from '../../types';
import { mockCampaigns } from '../../data/mockData';

interface DonationHistoryProps {
  donations: Donation[];
}

export default function DonationHistory({ donations }: DonationHistoryProps) {
  if (donations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">No donations yet</h3>
        <p className="text-gray-600">Start making a difference by supporting active campaigns</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Your Donation History</h3>
        <div className="space-y-4">
          {donations.map(donation => {
            const campaign = mockCampaigns.find(c => c.id === donation.campaignId);
            return (
              <div key={donation.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{campaign?.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{campaign?.location}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="font-semibold text-green-600">?{donation.amount.toLocaleString()}</span>
                      <span className="text-gray-500">{new Date(donation.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Blockchain Transaction</p>
                      <p className="font-mono text-sm text-gray-900">{donation.transactionHash}</p>
                    </div>
                    <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm font-medium">
                      <Link className="w-4 h-4" />
                      <span>Verify</span>
                    </button>
                  </div>
                </div>

                {donation.impactProof && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3">Impact Proof</h5>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {donation.impactProof.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt="Impact proof"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{donation.impactProof.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {donation.impactProof.beneficiaries} families helped
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
