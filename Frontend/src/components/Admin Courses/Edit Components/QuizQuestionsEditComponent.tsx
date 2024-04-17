import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, } from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup';
import { question_type } from "../../../constant";
import { getCourseAllInfoAPI, updateQuestionAPI } from "../../../constant";
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    FieldArray,FormikHelpers
  } from "formik";
interface Props {
  courseId: string;
}
interface QuestionFormValues {
    questions: question_type[];
  }

const QuizQuestionsEditComponent: React.FC<Props> = ({ courseId }) => {
  const [questions, setQuestions] = useState<question_type[]>([]);
  const [editableQuestions, setEditableQuestions] = useState<question_type[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsSaving(true);
    axios.get(`${getCourseAllInfoAPI}?courseId=${courseId}`)
      .then(response => {
        setQuestions(response.data.questions);
        setEditableQuestions(response.data.questions);
      })
      .catch(error => console.error("Error fetching questions", error))
      .finally(() => setIsSaving(false));
  }, [courseId]);

  const questionSchema = Yup.object({
    question_text: Yup.string().required("Question text is required"),
    options: Yup.array().of(Yup.string().required("Option text is required")).min(4, "At least two options are required"),
    correct_answer: Yup.number().required("A correct answer is required").min(1, "Invalid answer selected").max(4, "Invalid answer selected"),
    concept: Yup.string().required("Concept is required"),
  });

  const quizValidationSchema = Yup.object().shape({
    questions: Yup.array().of(questionSchema),
  });

  const handleSaveChanges = async (values: QuestionFormValues, actions: FormikHelpers<QuestionFormValues>) => {
    setIsSaving(true);
    try {
      for (const question of values.questions) {
        await axios.put(`${updateQuestionAPI}/${question._id}`, question);
      }
      actions.setSubmitting(false);
      // Refetch updated questions to update local state
      const response = await axios.get(
        `${getCourseAllInfoAPI}?courseId=${courseId}`
      );
      const updatedQuestions = response.data.questions;
      setQuestions(updatedQuestions); // Update questions with the newly fetched data
      setEditableQuestions(updatedQuestions); // Update editable questions with the latest data
      setEditMode(false);
    } catch (error) {
      console.error("Error updating questions", error);
      actions.setSubmitting(false);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="mx-auto border rounded border-primary p-3">
      <h3 className="display-4 text-center fw-bold mt-4 text-primary">
        Quiz Questions
      </h3>
      {!editMode ? (
        <>
          {questions.map((question, index) => (
            <Card key={index} className="mt-2 mb-2">
              <Card.Body>
              <Card.Title className="card-title text-primary text-center fw-bold fs-3">
                      Question {index + 1}
                    </Card.Title>

                    <Card.Text className="card-title  fw-bold">
                      Question Statement
                    </Card.Text>
                    <Card.Text className="text-primary  fw-bold">
                      {question.question_text}
                    </Card.Text>
                    <hr />

                    {question.options.map((option, optionIndex) => (
                      <Card.Text key={optionIndex}>
                        <span className="card-title fw-bold">
                          Option {optionIndex + 1} :{" "}
                        </span>
                        <span className="text-primary  fw-bold">{option}</span>
                      </Card.Text>
                    ))}
                    <hr />

                    <Card.Text>
                      <span className="card-title   fw-bold">
                        Correct Answer : {"  "}
                      </span>
                      <span className="text-primary  fw-bold">
                        Option
                        {question.correct_answer}
                      </span>
                    </Card.Text>
                    <hr />

                    <Card.Text>
                      <span className="card-title   fw-bold">
                        Concept : {"  "}
                      </span>
                      <span className="text-primary  fw-bold">
                        {question.concept}
                      </span>
                    </Card.Text>

              </Card.Body>
            </Card>
          ))}
          <div className="text-center">
            <Button variant="primary" onClick={toggleEditMode}>
              Edit Questions
            </Button>
          </div>
        </>
      ) : (
        <Formik
          initialValues={{ questions: editableQuestions }}
          validationSchema={quizValidationSchema}
          onSubmit={handleSaveChanges}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <FieldArray name="questions">
                {() => (
                  editableQuestions.map((question, index) => (
                    <div key={index} className="mb-3">
                      <h4 className="card-title text-primary text-center fw-bold fs-3">
                              Question {index + 1}
                            </h4>
                            <h6 className="card-title  fw-bold">
                              Question Statement
                            </h6>
                            <Field
                              name={`questions[${index}].question_text`}
                              placeholder="Question Text"
                              className="form-control mb-2  text-primary"
                            />
                      <ErrorMessage name={`questions[${index}].question_text`} component="div" className="text-danger" />
                      <hr />
                      {question.options.map((_, optionIndex) => (
                        <>
                        <span className="card-title fw-bold">
                        Option {optionIndex + 1}
                      </span>

                        <Field name={`questions[${index}].options[${optionIndex}]`} className="form-control mb-2 text-primary" key={optionIndex} />
                        <ErrorMessage
                                  name={`questions[${index}].options[${optionIndex}]`}
                                  component="div"
                                  className="text-danger"
                                />


                        </>
                      ))}
                       <hr />
                            <span className="card-title   fw-bold">
                              Correct Answer
                            </span>

                      <Field as="select" name={`questions[${index}].correct_answer`} className="form-select mb-2 text-primary">
                        <option value="">Select Correct Answer</option>
                        {question.options.map((_, optionIndex) => (
                          <option key={optionIndex} value={optionIndex+1}>
                            Option {optionIndex + 1}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name={`questions[${index}].correct_answer`} component="div" className="text-danger" />
                      <hr />
                            <span className="card-title   fw-bold">
                              Concept
                            </span>

                      <Field name={`questions[${index}].concept`} className="form-control mb-2 text-primary" />
                      <ErrorMessage name={`questions[${index}].concept`} component="div" className="text-danger" />
                    </div>
                  ))
                )}
              </FieldArray>
              <div className="d-flex justify-content-center">
                <Button type="submit" className="btn btn-success me-2" disabled={isSubmitting || isSaving}>
                  Save Changes
                </Button>
                <Button className="btn btn-danger" onClick={toggleEditMode}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {isSaving && <Spinner animation="border" variant="primary" />}
    </div>
  );
};

export default QuizQuestionsEditComponent;