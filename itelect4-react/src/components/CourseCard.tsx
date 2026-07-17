import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
  <div style={{ border: '1px solid #0066cc', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
    <h4>{course.title}</h4>
    <p><strong>ID:</strong> {course.id}</p>
    <p>{course.description}</p>
  </div>
);