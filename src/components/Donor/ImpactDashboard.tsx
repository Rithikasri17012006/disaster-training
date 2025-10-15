import { TrendingUp, Users, Heart, Award } from 'lucide-react';
import { Donation } from '../../types';

interface ImpactDashboardProps {
  donations: Donation[];
}

export default function ImpactDashboard({ donations }: ImpactDashboardProps) {
  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalBeneficiaries = donations.reduce((sum, d) => sum + (d.impactProof?.beneficiaries || 0), 0);
  const proofCount = donations.filter(d => d.impactProof).length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">Your Impact Story</h3>
        <p className="text-red-100">
          See the real-world difference your generosity is making in disaster-affected communities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Contribution</p>
          <p className="text-3xl font-bold text-gray-900">{totalDonated.toLocaleString()}</p>
          <p className="text-xs text-green-600 font-medium mt-2">100% allocated</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">People Impacted</p>
          <p className="text-3xl font-bold text-gray-900">{totalBeneficiaries}</p>
          <p className="text-xs text-blue-600 font-medium mt-2">Families helped</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Campaigns Supported</p>
          <p className="text-3xl font-bold text-gray-900">{donations.length}</p>
          <p className="text-xs text-red-600 font-medium mt-2">Active contributions</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Impact Verifications</p>
          <p className="text-3xl font-bold text-gray-900">{proofCount}</p>
          <p className="text-xs text-purple-600 font-medium mt-2">With photo proof</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Impact Timeline</h4>
          <div className="space-y-4">
            {donations.map((donation, index) => (
              <div key={donation.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-red-600 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900">{donation.amount.toLocaleString()} Donated</p>
                    <span className="text-xs text-gray-500">{new Date(donation.date).toLocaleDateString()}</span>
                  </div>
                  {donation.impactProof && (
                    <p className="text-sm text-gray-600">
                      Helped {donation.impactProof.beneficiaries} families
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Impact Photos</h4>
          <div className="grid grid-cols-2 gap-3">
            {donations
              .filter(d => d.impactProof?.photos)
              .flatMap(d => d.impactProof!.photos)
              .map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt="Impact"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg" />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Transparency Report</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <p className="font-semibold text-gray-900">Fund Allocation</p>
              <p className="text-sm text-gray-600">100% of your donations reach beneficiaries</p>
            </div>
            <span className="text-2xl font-bold text-green-600">100%</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <p className="font-semibold text-gray-900">Blockchain Verified</p>
              <p className="text-sm text-gray-600">All transactions recorded on blockchain</p>
            </div>
            <span className="text-2xl font-bold text-blue-600">{donations.length}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div>
              <p className="font-semibold text-gray-900">Impact Documented</p>
              <p className="text-sm text-gray-600">Photo and report verification</p>
            </div>
            <span className="text-2xl font-bold text-purple-600">{proofCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
