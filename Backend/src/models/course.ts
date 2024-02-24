import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema({
    title: { type: String, required: [true, 'Title is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    image_url: { type: String, required: [true, 'Image URL is required'] },
    admin_id: { type: Schema.Types.ObjectId, ref: 'Admin', required: [true, 'Admin ID is required'] }
  });


// Title getter and setter
courseSchema.methods.getTitle = function() {
    return this.title;
  };
  courseSchema.methods.setTitle = function(title: string) {
    this.title = title;
  };
  
  // Description getter and setter
  courseSchema.methods.getDescription = function() {
    return this.description;
  };
  courseSchema.methods.setDescription = function(description: string) {
    this.description = description;
  };
  
  // Image URL getter and setter
  courseSchema.methods.getImageUrl = function() {
    return this.image_url;
  };
  courseSchema.methods.setImageUrl = function(url: string) {
    this.image_url = url;
  };


module.exports = mongoose.model('Course', courseSchema);