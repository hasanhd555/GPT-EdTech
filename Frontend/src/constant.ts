export interface admin_type {
    email: string;
    password: string;
  }
  
  export interface comment_type {
    course_id: string;
    student_id: string;
    comment_text: string;
  }
  
  export interface course_type {
    title: string;
    description: string;
    image_url: string;
    admin_id: string;
  }
  
  export interface enrollment_type {
    user_id: string;
    course_id: string;
    completion_status: boolean;
    points: number;
  }
  
  export interface lesson_type {
    _id: string;
    lesson_num: number;
    title: string;
    content: string;
    course_id: string;
  }
  
  export interface question_type {
    question_text: string;
    correct_answer: number;
    options: string[];
    course_id: string;
  }
  
  export interface rating_type {
    course_id: string;
    user_id: string;
    rating: number;
  }
  
  export interface student_type  {
    username: string;
    email: string;
    password: string;
    name: string;
    age: number;
    gender: string;
    profile_picture: string;
  }
  