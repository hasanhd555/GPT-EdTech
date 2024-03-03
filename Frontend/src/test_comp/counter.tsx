import React from 'react';
import { useAppSelector } from '../redux/hooks/index';

const Counter: React.FC = () => {
  const count = useAppSelector((state) => state.counter);
  const { isAdmin,email,_id } = useAppSelector((state) => state.User);

  return (
    <div>
      <div>
        <strong>User Data:</strong>
        {isAdmin ? 'Admin' : 'Student'} - { _id||'Not logged in'} - { email||'Not logged in'}
      </div>
      <div>
        <strong>Count:</strong> {count}
      </div>
    </div>
  );
};

export default Counter;

  