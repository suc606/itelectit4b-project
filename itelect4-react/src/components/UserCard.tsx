import { User } from '../types';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
    <h3>{user.name}</h3>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Role:</strong> {user.role}</p>
  </div>
);