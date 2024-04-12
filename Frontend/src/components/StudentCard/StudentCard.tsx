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
import styles from "./StudentCard.module.css"; 

type StudentCardProps = {
  studentId: string | null;
};

const StudentCard: React.FC<StudentCardProps> = ({ studentId }) => {
  const [student, setStudent] = useState<student_type | null>(null); // State to store student data or null
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [isUploading, setIsUploading] = useState(false); // State to track if an image is currently uploading
  const [imageLoaded, setImageLoaded] = useState(true); // State to track if an image has loaded
  const [formData, setFormData] = useState({ // Form state to handle student data changes
    name: "",
    email: "",
    age: 0,
    gender: "",
    profile_picture: "",
  });

  // Fetch student data on mount or when studentId changes
  useEffect(() => {
    const fetchStudentData = async () => {
      if (studentId) {
        try {
          const response = await fetch(`${FetchStudentDataAPI + studentId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: student_type = await response.json();
          setStudent(data); // Set student data
          setImageLoaded(true); // Reset image loaded state
        } catch (error) {
          console.error("Fetching student data failed:", error);
          setStudent(null); // Reset student data on error
        }
      }
    };

    fetchStudentData();
  }, [studentId]); // This effect runs whenever studentId changes

  // Update form data whenever the student state changes
  useEffect(() => {
    if (student) {
      setFormData({ // Update formData state with the latest student data
        name: student.name, 
        email: student.email,
        age: student.age,
        gender: student.gender,
        profile_picture: student.profile_picture,
      });
    }
  }, [student]); // This effect runs whenever the student state changes

  // Toggle editing state
  const handleEdit = () => {
    setEditMode(!editMode); // Toggle the boolean state for editMode
  };

  // Update form data as user types in form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target; // Target input from form
    setFormData({ ...formData, [target.name]: target.value }); // Spread existing formData and update the changed field
  };

  // Submit updated data to server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!student) return; // Guard clause if no student is loaded

    const updateData = { // Prepare the updated data including the student's ID
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
      setStudent(updatedStudent); // Update student state with the newly updated data
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error(error);
    }
  };

  // Handle image upload and update student's profile picture
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]; // Get the file from the file input
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gpt_edtech360"); // Preset for cloudinary upload
      setIsUploading(true);
      setImageLoaded(false); // Set image loading state to false during upload

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
        setStudent(updatedStudent); // Update student state with new image URL
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
                  <div style={{ display: 'grid', gridTemplateColumns: '100px auto', alignItems: 'center', columnGap: '8px' }}>
                  <div className="mb-2" style={{ textAlign: 'left' }}>Email:</div>
                        <div className="mb-2">{student.email}</div>

                  </div>
                  {editMode ? (
                      <Form onSubmit={handleSubmit}>
                        
                        
                        <Form.Group as={Row} className="">
                          <Form.Label column sm={2}>Name:</Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="">
                          <Form.Label column sm={2}>Age:</Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              type="number"
                              name="age"
                              value={formData.age}
                              onChange={handleChange}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="">
                          <Form.Label column sm={2}>Gender:</Form.Label>
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

