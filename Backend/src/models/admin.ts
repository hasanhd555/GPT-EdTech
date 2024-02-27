import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IAdmin extends Document {
  email: string;
  password: string;
  isPasswordValid(password: string): Promise<boolean>;
}

const adminSchema = new mongoose.Schema({
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
});

// Set the email of the admin
adminSchema.methods.setEmail = function (email: string) {
  this.email = email;
};

// Get the email of the admin
adminSchema.methods.getEmail = function () {
  return this.email;
};

// Set the password of the admin
adminSchema.methods.setPassword = function (password: string) {
  this.password = password;
};

// Get the password of the admin
adminSchema.methods.getPassword = function () {
  return this.password;
};

// Pre Password Hash Function
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 5);
  this.password = hash;

  next();
});

// Hashed Password Validitiy Check Function
adminSchema.methods.isPasswordValid = async function (password: string) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
