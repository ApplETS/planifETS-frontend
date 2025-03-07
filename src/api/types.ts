// import type { CourseStatus } from '@/types/courseStatus';

/**
 * Standard API response wrapper
 */
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

/**
 * Detailed course information
 */
export type CourseDetail = {
  id: number;
  code: string;
  title: string;
  description: string;
  credits: number;
  department: string;
  prerequisites: {
    code: string;
    title: string;
  }[];
  corequisites: {
    code: string;
    title: string;
  }[];
  availability: string[];
  sections: CourseSection[];
};

/**
 * Course section information
 */
export type CourseSection = {
  id: number;
  sectionCode: string;
  instructor: string;
  schedule: CourseSchedule[];
  capacity: number;
  enrolled: number;
  remainingSeats: number;
  location: string;
};

/**
 * Course schedule information
 */
export type CourseSchedule = {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  building: string;
};

/**
 * Course instructor information
 */
export type CourseInstructor = {
  id: number;
  name: string;
  email: string;
  department: string;
  office: string;
  officeHours: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
};
