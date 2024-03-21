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
  concept: string;
}

export interface rating_type {
  course_id: string;
  user_id: string;
  rating: number;
}

export interface student_type {
  username: string;
  email: string;
  password: string;
  name: string;
  age: number;
  gender: string;
  profile_picture: string;
}

export const CloudinarBaseImageUrl: string =
  "http://res.cloudinary.com/do2hqf8du/image/upload/v1709494602/jhprjpcx0k75zfyqmnry.svg";

export const StudentRoute: string = "/api/student";

// Use the enrollment route
export const EnrollmentRoute: string = "/api/enrollment";

export const AdminRoute: string = "/api/admin";

export const CourseRoute: string = "/api/course";

export const CourseLessonRoute: string = "/api/course/lessons";

export const CourseRatingRoute: string = "/api/course/ratings";

export const CourseCommentRoute: string = "/api/course/comments";

export const CourseQuizRoute: string = "/api/course/quiz";
