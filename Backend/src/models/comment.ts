import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: [true, 'Course ID is required'] },
    student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: [true, 'Student ID is required'] },
    comment_text: { type: String, required: [true, 'Comment text is required'] }
  });

// Set the comment text
commentSchema.methods.setCommentText = function(text: string) {
    this.comment_text = text;
  };
  
  // Get the comment text
  commentSchema.methods.getCommentText = function() {
    return this.comment_text;
  };

  export default mongoose.model('Comment', commentSchema);