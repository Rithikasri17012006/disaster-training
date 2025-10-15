import { useState } from 'react';
import { FileText, Send, Clock, CheckCircle, Package } from 'lucide-react';

type RequestType = 'food' | 'medicine' | 'shelter' | 'rescue' | 'other';

export default function RequestsPanel() {
  const [requests, setRequests] = useState<any[]>([
    {
      id: 'REQ001',
      type: 'food',
      description: 'Need emergency food supplies for family of 4',
      status: 'in-progress',
      timestamp: '2025-10-15T12:00:00Z',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'food' as RequestType,
    description: '',
    priority: 'medium',
  });

  const handleSubmitRequest = () => {
    if (!formData.description.trim()) {
      alert('Please provide a description of your need');
      return;
    }

    const newRequest = {
      id: `REQ?{Date.now()}`,
      ...formData,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    setRequests([newRequest, ...requests]);
    setFormData({ type: 'food', description: '', priority: 'medium' });
    setShowForm(false);
    alert('Request submitted successfully! Help is on the way.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'fulfilled':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    return Package;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <FileText className="w-6 h-6" />
          <h3 className="text-xl font-bold">Post-Disaster Assistance Requests</h3>
        </div>
        <p className="text-orange-100">
          Request essential supplies and support during recovery. Track your requests and get real-time updates.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">My Requests</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
        >
          <Send className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Submit New Request</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as RequestType })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="food">Food & Water</option>
                <option value="medicine">Medicine & Medical Supplies</option>
                <option value="shelter">Temporary Shelter</option>
                <option value="rescue">Rescue Assistance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your needs in detail..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSubmitRequest}
                className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Submit Request
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests yet</h3>
            <p className="text-gray-600">Submit a request if you need assistance</p>
          </div>
        ) : (
          requests.map(request => {
            const Icon = getTypeIcon(request.type);
            return (
              <div key={request.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(request.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ?{getStatusColor(request.status)}`}>
                    {request.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                {request.status === 'in-progress' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-sm text-blue-800">
                      <div className="animate-pulse w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="font-medium">Help is on the way! Expected arrival in 30-45 minutes.</span>
                    </div>
                  </div>
                )}

                {request.status === 'fulfilled' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-sm text-green-800">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Request fulfilled successfully</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Request Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold mb-2">✓ Do:</p>
            <ul className="space-y-1 ml-4">
              <li>• Be specific about your needs</li>
              <li>• Provide accurate contact information</li>
              <li>• Update if situation changes</li>
              <li>• Indicate urgency level honestly</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">✗ Don't:</p>
            <ul className="space-y-1 ml-4">
              <li>• Submit duplicate requests</li>
              <li>• Exaggerate your needs</li>
              <li>• Use for non-emergency items</li>
              <li>• Forget to update your location</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
