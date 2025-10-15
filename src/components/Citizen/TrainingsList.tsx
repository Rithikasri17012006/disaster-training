import { useState } from 'react';
import { GraduationCap, MapPin, Calendar, Users, Award, CheckCircle } from 'lucide-react';
import { mockTrainings } from '../../data/mockData';

export default function TrainingsList() {
  const [registrations, setRegistrations] = useState<string[]>([]);
  const [attendanceCode, setAttendanceCode] = useState('');
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);

  const handleRegister = (trainingId: string) => {
    if (registrations.includes(trainingId)) {
      alert('You are already registered for this training');
      return;
    }
    setRegistrations([...registrations, trainingId]);
    alert('Successfully registered for training!');
  };

  const handleMarkAttendance = () => {
    const training = mockTrainings.find(t => t.id === selectedTraining);
    if (!training) return;

    if (attendanceCode.toUpperCase() === training.attendanceCode) {
      alert('Attendance marked successfully! Badge earned: Training Participant');
      setSelectedTraining(null);
      setAttendanceCode('');
    } else {
      alert('Invalid attendance code. Please check with your instructor.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <GraduationCap className="w-6 h-6" />
          <h3 className="text-xl font-bold">Disaster Preparedness Training</h3>
        </div>
        <p className="text-blue-100">
          Register for training sessions to learn essential survival skills and earn certificates.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Available Trainings</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockTrainings.map(training => {
            const isRegistered = registrations.includes(training.id);
            const isFull = training.enrolled >= training.capacity;
            const spotsLeft = training.capacity - training.enrolled;

            return (
              <div key={training.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{training.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{training.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ?{
                    training.phase === 'before' ? 'bg-blue-100 text-blue-700' :
                    training.phase === 'during' ? 'bg-red-100 text-red-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {training.phase.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{training.location.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(training.date).toLocaleDateString()} - {training.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Instructor: {training.instructor}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Enrollment</span>
                    <span className={`font-semibold ?{isFull ? 'text-red-600' : 'text-gray-900'}`}>
                      {training.enrolled}/{training.capacity} enrolled
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ?{
                        isFull ? 'bg-red-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `?{(training.enrolled / training.capacity) * 100}%` }}
                    />
                  </div>
                  {!isFull && (
                    <p className="text-xs text-orange-600 mt-1 font-medium">
                      Only {spotsLeft} spots left!
                    </p>
                  )}
                </div>

                {isRegistered ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Registered</span>
                    </div>
                    {training.status === 'ongoing' && (
                      <button
                        onClick={() => setSelectedTraining(training.id)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Mark Attendance
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleRegister(training.id)}
                    disabled={isFull}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ?{
                      isFull
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isFull ? 'Training Full' : 'Register Now'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Mark Attendance</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter the attendance code provided by your instructor or scan the QR code.
            </p>
            <input
              type="text"
              value={attendanceCode}
              onChange={(e) => setAttendanceCode(e.target.value)}
              placeholder="Enter attendance code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleMarkAttendance}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setSelectedTraining(null);
                  setAttendanceCode('');
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">My Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50 text-center">
            <Award className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Beginner</p>
            <p className="text-xs text-gray-600">First Training Completed</p>
          </div>
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 text-center">
            <Award className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">First Aid Certified</p>
            <p className="text-xs text-gray-600">Emergency Response</p>
          </div>
          <div className="border border-green-200 rounded-lg p-4 bg-green-50 text-center">
            <Award className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Community Helper</p>
            <p className="text-xs text-gray-600">3+ Trainings Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
