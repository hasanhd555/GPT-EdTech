import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  question_text: {
    type: String,
    required: [true, "Question text is required"],
  },
  correct_answer: {
    type: Number,
    required: [true, "Correct answer is required"],
  },
  options: { type: [String], required: [true, "Options are required"] },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course ID is required"],
  },
  concept: { type: String, required: [true, "Concept is required"] },
});

questionSchema.methods.setQuestionText = function (text: string) {
  this.question_text = text;
};

questionSchema.methods.getQuestionText = function () {
  return this.question_text;
};

questionSchema.methods.setQuestionConcept = function (text: string) {
  this.concept = text;
};

questionSchema.methods.getQuestionConcept = function () {
  return this.concept;
};

questionSchema.methods.setCorrectAnswer = function (answer: number) {
  this.correct_answer = answer;
};

questionSchema.methods.getCorrectAnswer = function () {
  return this.correct_answer;
};

questionSchema.methods.addOption = function (option: string) {
  this.options.push(option);
};

questionSchema.methods.removeOption = function (option: string) {
  const index = this.options.indexOf(option);
  if (index > -1) {
    this.options.splice(index, 1);
  }
};

export default mongoose.model("Question", questionSchema);
