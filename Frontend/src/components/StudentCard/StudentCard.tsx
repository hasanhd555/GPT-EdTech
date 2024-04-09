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
  const [isUploading, setIsUploading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true); // State to manage image loading
  const [formData, setFormData] = useState({
    name: "",
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
          setImageLoaded(true); // Ensure imageLoaded is true when student data is fetched
        } catch (error) {
          console.error("Fetching student data failed:", error);
          setStudent(null);
        }
      }
    };

    fetchStudentData();
  }, [studentId]);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name, 
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    const updateData = {
      ...formData,
      id: studentId,
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
      setIsUploading(true);
      setImageLoaded(false); // Start uploading and mark image as not loaded

      try {
        const response = await fetch(CloudinaryUploadAPI, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

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
        // Don't reset isUploading here; it will be reset when the new image is loaded
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsUploading(false); // Reset uploading state in case of error
      }
    }
  };

  if (!student) {
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
          <Card className={styles.cardLarge}>
            <Card.Body>
              <Row>
                <Col md={4} className="d-flex align-items-center flex-column">
                  <Image
                    roundedCircle
                    src={student.profile_picture || "placeholder-image-url"}
                    alt={student.name}
                    style={{ width: "150px", height: "150px" }}
                    onLoad={() => {
                      setImageLoaded(true); // Image loaded
                      setIsUploading(false); // Finish uploading only when image is loaded
                    }}
                  />
                  <Button
                    variant="primary"
                    className="mt-2"
                    onClick={() => document.getElementById("profilePicUpload")?.click()}
                    disabled={isUploading || !imageLoaded}
                  >
                    {isUploading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Uploading...</span>
                      </>
                    ) : (
                      "Change Picture"
                    )}
                  </Button>
                  <input
                    id="profilePicUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </Col>
                <Col md={8} style={{ borderLeft: "2px dotted #96BDF7" }}>
                  <Card.Title className={styles.cardTitleLarge}>
                    @{student.username.toUpperCase()}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Student</Card.Subtitle>
                  {editMode ? (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={2}>Name</Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={2}>Email</Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="email"
                              readOnly
                              defaultValue={student.email}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={2}>Age</Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="number"
                              name="age"
                              value={formData.age}
                              onChange={handleChange}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={2}>Gender</Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              as="select"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </Form.Control>
                          </Col>
                        </Form.Group>
                        <Button variant="danger" onClick={handleEdit} className="me-2">
                          Cancel
                        </Button>
                        <Button variant="success" type="submit">
                          Save Changes
                        </Button>
                      </Form>
                    ) : (
                    <div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '100px auto', alignItems: 'center', columnGap: '8px' }}>
                        <div style={{ textAlign: 'left' }}>Name:</div>
                        <div>{student.gender === "Male" ? "Mr. " : student.gender === "Female" ? "Mrs. " : ""}{student.name}</div>

                        <div style={{ textAlign: 'left' }}>Email:</div>
                        <div>{student.email}</div>

                        <div style={{ textAlign: 'left' }}>Age:</div>
                        <div>{student.age}</div>

                        <div style={{ textAlign: 'left' }}>Gender:</div>
                        <div>{student.gender}</div>
<div></div>
<div style={{ textAlign: 'right' }}><Button variant="primary" onClick={handleEdit} style={{ width: "25%" }}>
                          Edit
                        </Button></div>
                        
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

