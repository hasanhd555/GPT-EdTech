import mongoose, { Schema } from 'mongoose';

const ratingSchema = new Schema({
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: [true, 'Course ID is required'] },
    user_id: { type: Schema.Types.ObjectId, ref: 'Student', required: [true, 'User ID is required'] },
    rating: { type: Number, required: [true, 'Rating is required'] }
  });

// Set the rating
ratingSchema.methods.setRating = function(rating:number) {
    this.rating = rating;
  };
  
  // Get the rating
  ratingSchema.methods.getRating = function() {
    return this.rating;
  };

  export default mongoose.model('Rating', ratingSchema);