import React from "react";
import StudentCard from "../StudentCard/StudentCard"; 
import styles from './UserDashboard.module.css';

type UserDashboardProps = {
  studentId: string; 
};


const UserDashboard: React.FC<UserDashboardProps> = ({ studentId }) => {
  return (
    <div className={styles.userDashboardPage}>
      <div className={styles.heading}>
        <h2 className={styles.welcome}>Welcome to your Dashboard</h2>
        <h2 className={styles.userProfile}>User Profile</h2>
      </div>
      <StudentCard studentId={studentId} />

    <div className={styles.heading}>
      <h2 className={styles.userProfile}>Enrolled Courses</h2>

    </div>
    </div>
  );
};

export default UserDashboard;
