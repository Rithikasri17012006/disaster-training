import { useState } from 'react';
import { Sparkles, AlertTriangle, CheckCircle, Clock, Upload, MapPin } from 'lucide-react';
import { Task } from '../../types';

interface TasksPanelProps {
  tasks: Task[];
}

export default function TasksPanel({ tasks: initialTasks }: TasksPanelProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [proofFile, setProofFile] = useState<string>('');

  const handleStartTask = (taskId: string) => {
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, status: 'in-progress' as const } : t
    ));
  };

  const handleCompleteTask = (taskId: string) => {
    if (!proofFile) {
      alert('Please upload proof of completion');
      return;
    }

    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, status: 'completed' as const } : t
    ));
    setSelectedTask(null);
    setProofFile('');
    alert('Task marked as completed! Updates synced.');
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'before':
        return 'bg-blue-100 text-blue-700';
      case 'during':
        return 'bg-red-100 text-red-700';
      case 'after':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Sparkles className="w-6 h-6" />
          <h3 className="text-xl font-bold">AI-Generated Task Assignment</h3>
        </div>
        <p className="text-green-100">
          Tasks are automatically assigned based on disaster phase, location, and organizational capabilities.
          Complete tasks and upload proof for transparency.
        </p>
      </div>

      {pendingTasks.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Pending Tasks</h3>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
              {pendingTasks.length} pending
            </span>
          </div>
          <div className="space-y-4">
            {pendingTasks.map(task => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{task.title}</h4>
                      {task.aiGenerated && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold flex items-center space-x-1">
                          <Sparkles className="w-3 h-3" />
                          <span>AI</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className={`px-2 py-1 rounded font-semibold ?{getPhaseColor(task.phase)}`}>
                      {task.phase.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded font-semibold ?{getPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 col-span-2">
                    <MapPin className="w-4 h-4" />
                    <span>{task.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleStartTask(task.id)}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Start Task</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {inProgressTasks.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">In Progress</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {inProgressTasks.length} active
            </span>
          </div>
          <div className="space-y-4">
            {inProgressTasks.map(task => (
              <div key={task.id} className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{task.title}</h4>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{task.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {selectedTask === task.id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Proof (Photo/Document)
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={proofFile}
                          onChange={(e) => setProofFile(e.target.value)}
                          placeholder="mock-proof.jpg"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Mark Complete
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTask(null);
                          setProofFile('');
                        }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedTask(task.id)}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Task</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Completed Tasks</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              {completedTasks.length} completed
            </span>
          </div>
          <div className="space-y-3">
            {completedTasks.map(task => (
              <div key={task.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.location}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
