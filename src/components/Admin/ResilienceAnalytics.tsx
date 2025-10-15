import { TrendingUp, TrendingDown, Download, BarChart3 } from 'lucide-react';
import { mockResilienceData, mockTrainings, mockCampaigns } from '../../data/mockData';

export default function ResilienceAnalytics() {
  const avgResilienceScore = (mockResilienceData.reduce((acc, r) => acc + r.score, 0) / mockResilienceData.length).toFixed(1);
  const avgCoverage = Math.round(mockResilienceData.reduce((acc, r) => acc + r.trainingCoverage, 0) / mockResilienceData.length);
  const totalTrained = mockResilienceData.reduce((acc, r) => acc + r.trainedPopulation, 0);
  const totalPopulation = mockResilienceData.reduce((acc, r) => acc + r.population, 0);

  const handleExport = () => {
    const data = {
      generatedAt: new Date().toISOString(),
      summary: {
        avgResilienceScore,
        avgCoverage,
        totalTrained,
        totalPopulation,
      },
      regionData: mockResilienceData,
      trainings: mockTrainings,
      campaigns: mockCampaigns,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resilience-report-?{Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Resilience Analytics Dashboard</h3>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Resilience Score</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{avgResilienceScore}/10</p>
          <p className="text-xs text-green-600 font-medium">+0.3 from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Training Coverage</p>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{avgCoverage}%</p>
          <p className="text-xs text-blue-600 font-medium">+5% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Trained</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{(totalTrained / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-green-600 font-medium">+125K from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Readiness Score</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {Math.round(mockResilienceData.reduce((acc, r) => acc + r.readinessScore, 0) / mockResilienceData.length)}%
          </p>
          <p className="text-xs text-green-600 font-medium">+4% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Regional Resilience Scores</h4>
          <div className="space-y-4">
            {mockResilienceData.map((region, index) => {
              const barColor =
                region.score >= 7 ? 'bg-green-600'
                : region.score >= 6 ? 'bg-blue-600'
                : 'bg-orange-600';
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{region.location}</span>
                    <span className="text-sm font-bold text-gray-700">{region.score}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 relative">
                    <div
                      className={`h-3 rounded-full ${barColor} transition-all`}
                      style={{ width: `${region.score * 10}%` }}
                    />
                    <span
                      className="absolute right-2 top-0 text-xs font-semibold text-gray-700"
                      style={{ left: `${region.score * 10}%`, transform: 'translateX(-100%)' }}
                    >
                      
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Vulnerability Index</h4>
          <div className="space-y-4">
            {mockResilienceData
              .sort((a, b) => b.vulnerabilityIndex - a.vulnerabilityIndex)
              .map((region, index) => {
                const vulnBarColor =
                  region.vulnerabilityIndex >= 8 ? 'bg-red-600'
                  : region.vulnerabilityIndex >= 7 ? 'bg-orange-600'
                  : 'bg-yellow-600';
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{region.location}</span>
                      <span className="text-sm font-bold text-gray-700">{region.vulnerabilityIndex}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 relative">
                      <div
                        className={`h-3 rounded-full ${vulnBarColor} transition-all`}
                        style={{ width: `${region.vulnerabilityIndex * 10}%` }}
                      />
                      <span
                        className="absolute right-2 top-0 text-xs font-semibold text-gray-700"
                        style={{ left: `${region.vulnerabilityIndex * 10}%`, transform: 'translateX(-100%)' }}
                      >
                        
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Detailed Regional Analysis</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Location</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Population</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Trained</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Coverage</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Resilience</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Readiness</th>
              </tr>
            </thead>
            <tbody>
              {mockResilienceData.map((region, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{region.location}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{region.population.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{region.trainedPopulation.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ?{
                      region.trainingCoverage >= 50 ? 'bg-green-100 text-green-700' :
                      region.trainingCoverage >= 40 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {region.trainingCoverage}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">{region.score}/10</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">{region.readinessScore}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
