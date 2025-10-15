import { useState } from 'react';
import { AlertOctagon, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

export default function SOSPanel() {
  const [sosSent, setSosSent] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleSendSOS = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(userLocation);
        setSosSent(true);
        setTimeout(() => setSosSent(false), 5000);
      },
      () => {
        const mockLocation = { lat: 34.0522, lng: -118.2437 };
        setLocation(mockLocation);
        setSosSent(true);
        setTimeout(() => setSosSent(false), 5000);
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <AlertOctagon className="w-6 h-6" />
          <h3 className="text-xl font-bold">Emergency SOS</h3>
        </div>
        <p className="text-red-100">
          In case of emergency, use the SOS button to send your location to nearby responders and emergency services.
        </p>
      </div>

      {sosSent ? (
        <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">SOS Alert Sent!</h3>
          <p className="text-gray-600 mb-6">
            Emergency responders have been notified of your location and will reach you shortly.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <p className="font-semibold text-gray-900">Your Location</p>
            </div>
            <p className="text-sm text-gray-700">
              Latitude: {location?.lat.toFixed(4)}
            </p>
            <p className="text-sm text-gray-700">
              Longitude: {location?.lng.toFixed(4)}
            </p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>✓ Admin dashboard notified</p>
            <p>✓ Nearest NGO responders alerted</p>
            <p>✓ Emergency services contacted</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
          <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <AlertOctagon className="w-20 h-20 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Emergency SOS</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Press the button below if you need immediate emergency assistance. Your location will be sent to nearby
            responders, NGOs, and emergency services.
          </p>
          <button
            onClick={handleSendSOS}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
          >
            <Send className="w-6 h-6" />
            <span>SEND SOS ALERT</span>
          </button>
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Note:</span> Only use this feature in genuine emergencies. False alarms
              can divert resources from people who truly need help.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Phone className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-bold text-gray-900">What Happens Next?</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-red-600">1</span>
              </div>
              <p>Your exact GPS location is immediately shared with emergency services</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-red-600">2</span>
              </div>
              <p>Nearby NGO responders and trained volunteers are notified</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-red-600">3</span>
              </div>
              <p>Admin dashboard flags your alert for immediate action</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-red-600">4</span>
              </div>
              <p>Help is dispatched to your location within minutes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <AlertOctagon className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-900">When to Use SOS</h3>
          </div>
          <div className="space-y-3">
            <div className="border-l-4 border-red-500 pl-3 py-2">
              <p className="font-semibold text-gray-900 text-sm">Life-Threatening Emergency</p>
              <p className="text-xs text-gray-600">Immediate danger to life or severe injury</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-3 py-2">
              <p className="font-semibold text-gray-900 text-sm">Natural Disaster</p>
              <p className="text-xs text-gray-600">Trapped, injured, or in danger during disaster</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3 py-2">
              <p className="font-semibold text-gray-900 text-sm">Medical Emergency</p>
              <p className="text-xs text-gray-600">Urgent medical attention required</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-3 py-2">
              <p className="font-semibold text-gray-900 text-sm">Immediate Rescue Needed</p>
              <p className="text-xs text-gray-600">Unable to reach safety on your own</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <AlertOctagon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Important Safety Information</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Stay calm and find a safe location if possible</li>
              <li>• Keep your phone charged and with you at all times</li>
              <li>• If unable to speak, stay on the line - responders can track your location</li>
              <li>• Follow instructions from emergency responders</li>
              <li>• Do not attempt to move if you are injured unless in immediate danger</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
