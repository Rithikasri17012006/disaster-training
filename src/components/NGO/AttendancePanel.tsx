import { useState } from 'react';
import { QrCode, CheckCircle, Users, Calendar } from 'lucide-react';
import { mockTrainings } from '../../data/mockData';

export default function AttendancePanel() {
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
  const [attendanceCode, setAttendanceCode] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleMarkAttendance = () => {
    const training = mockTrainings.find(t => t.id === selectedTraining);
    if (!training) return;

    if (attendanceCode.toUpperCase() === training.attendanceCode) {
      alert('Attendance marked successfully!');
      setSelectedTraining(null);
      setAttendanceCode('');
    } else {
      alert('Invalid attendance code. Please try again.');
    }
  };

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    alert(`OTP Generated: ${otp}\nShare this with participants for attendance.`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Users className="w-6 h-6" />
          <h3 className="text-xl font-bold">Training Attendance Management</h3>
        </div>
        <p className="text-blue-100">
          Track participant attendance using QR codes or OTP verification for accurate records.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Active Trainings</h3>
          <div className="space-y-3">
            {mockTrainings
              .filter(t => t.status === 'upcoming' || t.status === 'ongoing')
              .map(training => (
                <div
                  key={training.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTraining === training.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedTraining(training.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{training.title}</h4>
                      <p className="text-sm text-gray-600">{training.location.name}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      training.status === 'ongoing'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {training.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(training.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{training.enrolled}/{training.capacity}</span>
                    </div>
                  </div>
                  <div className="mt-3">
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

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          {selectedTraining ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Attendance Tracking</h3>
                <p className="text-sm text-gray-600">
                  {mockTrainings.find(t => t.id === selectedTraining)?.title}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">QR Code Attendance</h4>
                  {showQR ? (
                    <div className="text-center">
                      <div className="w-48 h-48 bg-gray-900 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <QrCode className="w-32 h-32 text-white" />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Participants scan this code to mark attendance
                      </p>
                      <button
                        onClick={() => setShowQR(false)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        Hide QR Code
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowQR(true)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <QrCode className="w-5 h-5" />
                      <span>Generate QR Code</span>
                    </button>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">OTP Verification</h4>
                  <button
                    onClick={generateOTP}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Generate OTP
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Manual Code Entry</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={attendanceCode}
                      onChange={(e) => setAttendanceCode(e.target.value)}
                      placeholder="Enter attendance code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleMarkAttendance}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark Attendance</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Hint:</span> The attendance code for this training is{' '}
                  <span className="font-mono font-bold">
                    {mockTrainings.find(t => t.id === selectedTraining)?.attendanceCode}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Training</h3>
              <p className="text-gray-600">Choose a training from the list to manage attendance</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Attendance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTrainings
            .filter(t => t.status === 'completed')
            .map(training => (
              <div key={training.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{training.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{new Date(training.date).toLocaleDateString()}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Attendance</span>
                  <span className="text-lg font-bold text-green-600">
                    {training.enrolled}/{training.capacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(training.enrolled / training.capacity) * 100}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
