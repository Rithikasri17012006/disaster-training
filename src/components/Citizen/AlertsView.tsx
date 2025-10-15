import { Bell, AlertTriangle, Info, CheckCircle, Shield, FileText } from 'lucide-react';
import { mockAlerts } from '../../data/mockData';

export default function AlertsView() {
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
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const safetyChecklist = [
    'Emergency kit prepared with water, food, and medical supplies',
    'Important documents stored in waterproof container',
    'Family emergency contact list updated',
    'Evacuation route planned and known to all family members',
    'Flashlight, batteries, and radio available',
    'First aid kit fully stocked',
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Bell className="w-6 h-6" />
          <h3 className="text-xl font-bold">Emergency Alerts & Safety Information</h3>
        </div>
        <p className="text-red-100">
          Stay informed with real-time alerts and safety guidelines for your area.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Active Alerts</h3>
            <div className="space-y-3">
              {mockAlerts.map(alert => {
                const Icon = getAlertIcon(alert.type);
                return (
                  <div
                    key={alert.id}
                    className={`border rounded-lg p-4 ${getAlertStyles(alert.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                            alert.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm mb-2 text-gray-700">{alert.message}</p>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span className="font-medium">{alert.location}</span>
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Safety Checklist</h3>
            </div>
            <div className="space-y-2">
              {safetyChecklist.map((item, index) => (
                <label key={index} className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Quick Tip</h4>
            </div>
            <p className="text-sm text-gray-700">
              Keep your phone charged and have a backup power bank ready. Download offline maps of your area.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-bold text-gray-900">Evacuation Guidelines</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">1</span>
              </div>
              <p>Stay calm and gather your emergency kit and important documents</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">2</span>
              </div>
              <p>Follow designated evacuation routes and avoid shortcuts</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">3</span>
              </div>
              <p>Listen to official instructions from authorities</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">4</span>
              </div>
              <p>Check on neighbors who may need assistance</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">5</span>
              </div>
              <p>Register at evacuation center for tracking and assistance</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-bold text-gray-900">Emergency Contacts</h3>
          </div>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-gray-900 mb-1">Emergency Services</p>
              <p className="text-2xl font-bold text-red-600">911</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-gray-900 mb-1">Disaster Helpline</p>
              <p className="text-xl font-bold text-blue-600">1-800-DISASTER</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-gray-900 mb-1">Local NGO Support</p>
              <p className="text-xl font-bold text-green-600">1-800-NGO-HELP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
