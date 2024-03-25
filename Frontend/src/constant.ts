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
  _id:string;
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
  _id: string;
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

export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
  username?: string;
  age?: number;
  gender?: string;
}

export const getAllCoursesAPI: string = "http://localhost:5001/api/course";
export const getEditableCoursesAPI: string = "http://localhost:5001/api/course/editable";
export const getCourseAllInfoAPI: string = "http://localhost:5001/api/course/get-all-info";
export const updateCourseDetailsAPI: string = "http://localhost:5001/api/course/update-details";

export const getTotalPointsAPI: string =
  "http://localhost:5001/api/enrollment/get-total-points";
export const GoldMedalImgUrl: string =
  "http://res.cloudinary.com/do2hqf8du/image/upload/v1709652796/vuyzjib3oka1lpbh2ne5.svg";
export const SilverMedalImgUrl: string =
  "http://res.cloudinary.com/do2hqf8du/image/upload/v1709652859/ynmptmehr25iptbkqzbo.svg";
export const BronzeMedalImgUrl: string =
  "http://res.cloudinary.com/do2hqf8du/image/upload/v1709652918/eo1gkjmn5ymoyerfmkov.svg";
export const GiveRatingAPI: string =
  "http://localhost:5001/api/course/ratings/give-rating";
export const SetPointsAPI: string =
  "http://localhost:5001/api/enrollment/set-points";
export const getEnrollmentAPI: string =
  "http://localhost:5001/api/enrollment/get-enrollment";
export const getQuizbyCourseIdAPI: string =
  "http://localhost:5001/api/course/quiz/get-by-id";

export const SearchCourseAPI: string =
  "http://localhost:5001/api/course/search";

export const FetchStudentDataAPI: string =
  "http://localhost:5001/api/student/?id=";

export const UpdateStudentAPI: string =
  "http://localhost:5001/api/student/update";

export const CloudinaryUploadAPI: string =
  "https://api.cloudinary.com/v1_1/do2hqf8du/image/upload";

export const FetchCourseAPI: string =
  "http://localhost:5001/api/enrollment/courses";

export const GetCourseInfo: string =
  "http://localhost:5001/api/course/get-info";

export const GetLessonsById: string =
  "http://localhost:5001/api/course/lessons/get-by-id";

export const AddCommentAPI: string =
  "http://localhost:5001/api/course/comments/add-comment";

export const GetCommentById: string =
  "http://localhost:5001/api/course/comments/get-by-id";

export const EnrollStudentAPI: string =
  "http://localhost:5001/api/enrollment/enroll";

export const GetAvgCourseRatingAPI: string =
  "http://localhost:5001/api/course/ratings/get-by-id";

export const BaseAPI: string = "http://localhost:5001/api/";

export const CreateNewCourse: string = "http://localhost:5001/api/course/create";
