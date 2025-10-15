export type UserRole = 'admin' | 'donor' | 'ngo' | 'citizen';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  organizationId?: string;
}

export interface Disaster {
  id: string;
  name: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: { lat: number; lng: number; name: string };
  status: 'predicted' | 'active' | 'recovery';
  startDate: string;
  affectedPopulation: number;
  riskScore: number;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  phase: 'before' | 'during' | 'after';
  location: { lat: number; lng: number; name: string };
  date: string;
  duration: string;
  capacity: number;
  enrolled: number;
  instructor: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  attendanceCode?: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  phase: 'before' | 'during' | 'after';
  targetAmount: number;
  raisedAmount: number;
  location: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'completed';
  approved: boolean;
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

export interface Donation {
  id: string;
  campaignId: string;
  donorId: string;
  amount: number;
  date: string;
  transactionHash: string;
  impactProof?: {
    photos: string[];
    description: string;
    beneficiaries: number;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  phase: 'before' | 'during' | 'after';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  location: string;
  aiGenerated: boolean;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  timestamp: string;
  aiPredicted: boolean;
}

export interface Request {
  id: string;
  citizenId: string;
  type: 'food' | 'medicine' | 'shelter' | 'rescue' | 'other';
  description: string;
  location: { lat: number; lng: number; name: string };
  status: 'pending' | 'in-progress' | 'fulfilled' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  assignedTo?: string;
}

export interface ResilienceData {
  location: string;
  score: number;
  trainingCoverage: number;
  readinessScore: number;
  vulnerabilityIndex: number;
  population: number;
  trainedPopulation: number;
}
