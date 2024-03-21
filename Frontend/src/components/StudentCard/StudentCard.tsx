import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Form,
  Card,
  Image,
} from "react-bootstrap";
import {
  CloudinaryUploadAPI,
  FetchStudentDataAPI,
  student_type,
  UpdateStudentAPI,
} from "../../constant";
import styles from "./StudentCard.module.css"; // Make sure this path is correct

type StudentCardProps = {
  studentId: string | null;
};

const StudentCard: React.FC<StudentCardProps> = ({ studentId }) => {
  const [student, setStudent] = useState<student_type | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    age: 0,
    gender: "",
    profile_picture: "",
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      if (studentId) {
        try {
          const response = await fetch(`${FetchStudentDataAPI + studentId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: student_type = await response.json();
          setStudent(data);
        } catch (error) {
          console.error("Fetching student data failed:", error);
          setStudent(null);
        }
      }
    };

    fetchStudentData();
  }, [studentId]);

  useEffect(() => {
    // When student data is fetched, populate the formData state
    if (student) {
      setFormData({
        email: student.email,
        age: student.age,
        gender: student.gender,
        profile_picture: student.profile_picture,
      });
    }
  }, [student]);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    const updateData = {
      ...formData,
      id: studentId, // Include the student ID in the body
    };

    try {
      const response = await fetch(UpdateStudentAPI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedStudent: student_type = await response.json();
      setStudent(updatedStudent);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gpt_edtech360");

      try {
        const response = await fetch(CloudinaryUploadAPI, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        // Update profile picture URL in the database
        const updateResponse = await fetch(UpdateStudentAPI, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: studentId,
            profile_picture: data.url,
          }),
        });
        const updatedStudent: student_type = await updateResponse.json();
        setStudent(updatedStudent);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  if (!student) {
    // return <div>Loading...</div>;
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={10}>
          {" "}
          {/* Changed from md={8} to lg={10} to increase card width */}
          <Card className={styles.cardLarge}>
            <Card.Body>
              <Row>
                <Col md={4} className="d-flex align-items-center flex-column">
                  <Image
                    roundedCircle
                    src={student.profile_picture || "placeholder-image-url"}
                    alt={student.name}
                    style={{ width: "150px", height: "150px" }}
                  />
                  <Button
                    variant="primary"
                    className="mt-2"
                    onClick={() =>
                      document.getElementById("profilePicUpload")?.click()
                    }
                  >
                    Change Picture
                  </Button>
                  <input
                    id="profilePicUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    placeholder="Profile Pic"
                    style={{ display: "none" }}
                  />
                </Col>
                <Col style={{ borderLeft: "2px dotted #96BDF7" }} md={8}>
                  {/* <Card.Title className={styles.cardTitleLarge}>{`Mr. ${student.name}`}</Card.Title> */}
                  <Card.Title className={styles.cardTitleLarge}>
                    {student.gender === "Male"
                      ? "Mr. "
                      : student.gender === "Female"
                      ? "Mrs. "
                      : ""}
                    {student.name}
                  </Card.Title>

                  <Card.Subtitle className="mb-2 text-muted">
                    Student
                  </Card.Subtitle>
                  {editMode ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                          Email
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                          Age
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Enter age"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                          Gender
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            as="select"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            title="Select Gender"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Row>
                        <Col sm={12} className="d-flex justify-content-end">
                          <Button
                            variant="danger"
                            onClick={handleEdit}
                            className="me-2"
                          >
                            Cancel
                          </Button>
                          <Button variant="success" type="submit">
                            Save Changes
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  ) : (
                    <div>
                      <div>Email: {student.email}</div>
                      <div>Age: {student.age}</div>
                      <div>Gender: {student.gender}</div>
                      <div style={{ textAlign: "right" }}>
                        <Button
                          className=""
                          variant="primary"
                          onClick={handleEdit}
                          style={{ width: "25%" }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentCard;
