import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: [true, 'Email is required'] },
  password: { type: String, required: [true, 'Password is required'] }
});

// Set the email of the admin
adminSchema.methods.setEmail = function(email: string) {
  this.email = email;
};

// Get the email of the admin
adminSchema.methods.getEmail = function() {
  return this.email;
};

// Set the password of the admin
adminSchema.methods.setPassword = function(password: string) {
  this.password = password;
};

// Get the password of the admin
adminSchema.methods.getPassword = function() {
  return this.password;
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
