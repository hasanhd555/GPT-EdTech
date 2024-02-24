import mongoose, { Schema } from 'mongoose';

const enrollmentSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'Student', required: [true, 'User ID is required'] },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: [true, 'Course ID is required'] },
    completion_status: { type: Boolean, required: [true, 'Completion status is required'] },
    points: { type: Number, required: [true, 'Points are required'] }
  });

// Setters and getters
enrollmentSchema.methods.setCompletionStatus = function(status: boolean) {
    this.completion_status = status;
  };
  enrollmentSchema.methods.getCompletionStatus = function() {
    return this.completion_status;
  };
  enrollmentSchema.methods.setPoints = function(points: number) {
    this.points = points;
  };
  enrollmentSchema.methods.getPoints = function() {
    return this.points;
  };

module.exports = mongoose.model('Enrollment', enrollmentSchema);