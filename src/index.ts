import type { User, Course, ApiResponse, UserRole } from '../types';

function getById<T extends { id: string | number }>(items: T[], id: string | number): T | undefined {
  return items.find(item => item.id === id);
}

const mockUsers: User[] = [
  { id: 1, name: 'Marcus', email: 'marcus@dlsl.edu.ph', role: 'STUDENT' as UserRole },
  { id: 2, name: 'Professor', email: 'prof@dlsl.edu.ph', role: 'TEACHER' as UserRole }
];

const foundUser = getById(mockUsers, 1);
console.log('Found User:', foundUser);

const response: ApiResponse<User> = {
  status: 'success',
  data: mockUsers[0]!
};
console.log('API Response sample:', response);

const course: Course = {
  id: 'ITELECT4',
  title: 'IT Elective 4',
  description: '3 units - 1st Semester 2026-2027'
};
console.log('Course:', course);
