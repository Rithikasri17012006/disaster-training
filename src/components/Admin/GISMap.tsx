import { mockDisasters, mockTrainings } from '../../data/mockData';
import { MapPin, AlertTriangle, Users } from 'lucide-react';

export default function GISMap() {
  return (
    <div className="space-y-6">
      {/* Interactive Mock Map */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Interactive Risk Map</h3>

        {/* Map Container */}
        <div className="relative bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 rounded-lg h-96 overflow-hidden border-2 border-gray-200">

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none grid grid-cols-10 grid-rows-10">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="border border-gray-200/50"
              />
            ))}
          </div>

         
          {/* Disaster Pins */}
          {mockDisasters.map((disaster, index) => (
            <div
              key={disaster.id}
              className="absolute"
              style={{
                left: `${20 + index * 20}%`,
                top: `${25 + index * 15}%`,
              }}
            >
              <div className="relative group cursor-pointer">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center animate-pulse ${
                    disaster.severity === 'critical'
                      ? 'bg-red-500'
                      : disaster.severity === 'high'
                      ? 'bg-orange-500'
                      : 'bg-yellow-500'
                  }`}
                >
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
                    <p className="font-semibold">{disaster.name}</p>
                    <p>{disaster.location.name}</p>
                    <p className="text-gray-300">Risk: {disaster.riskScore}/10</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Training Pins */}
          {mockTrainings.map((training, index) => (
            <div
              key={training.id}
              className="absolute"
              style={{
                left: `${25 + index * 20}%`,
                top: `${50 + index * 10}%`,
              }}
            >
              <div className="relative group cursor-pointer">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
                    <p className="font-semibold">{training.title}</p>
                    <p>{training.location.name}</p>
                    <p className="text-gray-300">
                      {training.enrolled}/{training.capacity} enrolled
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Risk Zones and Training Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Zones */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Zones</h3>
          <div className="space-y-3">
            {mockDisasters.map(disaster => (
              <div key={disaster.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{disaster.name}</h4>
                    <p className="text-sm text-gray-600">{disaster.location.name}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      disaster.severity === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : disaster.severity === 'high'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {disaster.severity.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-gray-500">Risk Score</p>
                    <p className="font-semibold text-gray-900">{disaster.riskScore}/10</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Affected Population</p>
                    <p className="font-semibold text-gray-900">
                      {disaster.affectedPopulation.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Locations */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Training Locations</h3>
          <div className="space-y-3">
            {mockTrainings.map(training => (
              <div key={training.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{training.title}</h4>
                    <p className="text-sm text-gray-600">{training.location.name}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      training.status === 'ongoing'
                        ? 'bg-green-100 text-green-700'
                        : training.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {training.status.toUpperCase()}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Enrollment</span>
                    <span className="font-semibold text-gray-900">
                      {training.enrolled}/{training.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(training.enrolled / training.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
