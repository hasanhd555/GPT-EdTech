import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IStudent extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  age: number;
  gender: string;
  profile_picture: string;
  isPasswordValid(password: string): Promise<boolean>;
}

const studentSchema = new Schema({
  username: { type: String, required: [true, "Username is required"] },
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
  name: { type: String, required: [true, "Name is required"] },
  age: { type: Number, required: [true, "Age is required"] },
  gender: { type: String, required: [true, "Gender is required"] },
  profile_picture: {
    type: String,
    required: [true, "Profile picture is required"],
  },
});

// Setters
studentSchema.methods.setUsername = function (username: String) {
  this.username = username;
};
studentSchema.methods.setEmail = function (email: String) {
  this.email = email;
};
studentSchema.methods.setPassword = function (password: String) {
  this.password = password;
};
studentSchema.methods.setName = function (name: String) {
  this.name = name;
};
studentSchema.methods.setAge = function (age: number) {
  this.age = age;
};
studentSchema.methods.setGender = function (gender: String) {
  this.gender = gender;
};
studentSchema.methods.setProfilePicture = function (profile_picture: String) {
  this.profile_picture = profile_picture;
};

// Getters
studentSchema.methods.getUsername = function () {
  return this.username;
};
studentSchema.methods.getEmail = function () {
  return this.email;
};
studentSchema.methods.getPassword = function () {
  return this.password;
};
studentSchema.methods.getName = function () {
  return this.name;
};
studentSchema.methods.getAge = function () {
  return this.age;
};
studentSchema.methods.getGender = function () {
  return this.gender;
};
studentSchema.methods.getProfilePicture = function () {
  return this.profile_picture;
};

// Pre Hash Function
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 5);
  this.password = hash;

  next();
});

// Hashed Password Validitiy Check Function
studentSchema.methods.isPasswordValid = async function (password: string) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const Student = mongoose.model<IStudent>("Student", studentSchema);

export default Student;
