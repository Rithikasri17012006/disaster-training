import { Bell, AlertTriangle, Info, CheckCircle, Sparkles } from 'lucide-react';
import { mockAlerts } from '../../data/mockData';

export default function AlertsPanel() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger':
        return AlertTriangle;
      case 'warning':
        return Bell;
      case 'success':
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'danger':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-900';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-900';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Sparkles className="w-6 h-6" />
          <h3 className="text-xl font-bold">AI-Powered Alert System</h3>
        </div>
        <p className="text-blue-100">
          Real-time predictive alerts powered by machine learning algorithms analyzing weather patterns,
          historical data, and current conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Active Alerts</h3>
          <div className="space-y-3">
            {mockAlerts.map(alert => {
              const Icon = getAlertIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`border rounded-lg p-4 ?{getAlertStyles(alert.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{alert.title}</h4>
                        {alert.aiPredicted && (
                          <span className="px-2 py-0.5 bg-white/50 rounded text-xs font-semibold flex items-center space-x-1">
                            <Sparkles className="w-3 h-3" />
                            <span>AI</span>
                          </span>
                        )}
                      </div>
                      <p className="text-sm mb-2">{alert.message}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{alert.location}</span>
                        <span className="opacity-75">
                          {new Date(alert.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">AI Training Suggestions</h3>
            <div className="space-y-3">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Urgent: Hurricane Preparedness</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      AI recommends immediate training in Orlando area due to Hurricane Alex prediction.
                      Estimated impact: 250,000 residents.
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                        HIGH PRIORITY
                      </span>
                      <span className="text-xs text-gray-600">Confidence: 94%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Fire Safety Training</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Based on wildfire activity, schedule additional fire safety workshops in LA region.
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                        MEDIUM PRIORITY
                      </span>
                      <span className="text-xs text-gray-600">Confidence: 87%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Alert Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-3xl font-bold text-red-600">
                  {mockAlerts.filter(a => a.type === 'danger').length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Critical</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">
                  {mockAlerts.filter(a => a.type === 'warning').length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Warnings</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">
                  {mockAlerts.filter(a => a.aiPredicted).length}
                </p>
                <p className="text-sm text-gray-600 mt-1">AI Predicted</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">92%</p>
                <p className="text-sm text-gray-600 mt-1">Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
