import mongoose, { Schema } from 'mongoose';

const lessonSchema = new Schema({
    lesson_num: { type: Number, required: [true, 'Lesson number is required'] },
    title: { type: String, required: [true, 'Title is required'] },
    content: { type: String, required: [true, 'Content is required'] },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: [true, 'Course ID is required'] }
  });

// Implementing getters and setters
lessonSchema.methods.setLessonNum = function(num: number) {
    this.lesson_num = num;
  };
  lessonSchema.methods.getLessonNum = function() {
    return this.lesson_num;
  };
  lessonSchema.methods.setTitle = function(title: string) {
    this.title = title;
  };
  lessonSchema.methods.getTitle = function() {
    return this.title;
  };
  lessonSchema.methods.setContent = function(content: string) {
    this.content = content;
  };
  lessonSchema.methods.getContent = function() {
    return this.content;
  };
  

  export default mongoose.model('Lesson', lessonSchema);