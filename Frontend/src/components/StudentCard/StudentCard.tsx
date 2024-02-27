import React, { useState, useEffect } from "react";
import "./StudentCard.css";
import { student_type } from "../../constant"; // Adjust the import path to where your Constants.ts file is located
import Button from "react-bootstrap/Button";

type StudentCardProps = {
  studentId: string;
};

const StudentCard: React.FC<StudentCardProps> = ({ studentId }) => {
  const [student, setStudent] = useState<student_type | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editPictureMode, setEditPictureMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    age: 0,
    gender: "",
    profile_picture: "",
  });

  useEffect(() => {
    const fetchStudentData = async (id: string) => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/student/?id=${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: student_type = await response.json();
        setStudent(data);
      } catch (e) {
        console.error(e);
        setStudent(null);
      }
    };

    if (studentId) {
      fetchStudentData(studentId);
    }
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    const updateData = {
      ...formData,
      id: studentId, // Include the student ID in the body
    };

    try {
      const response = await fetch(`http://localhost:5001/api/student/update`, {
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
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/do2hqf8du/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();

        // Update profile picture URL in the database
        const updateResponse = await fetch(
          `http://localhost:5001/api/student/update`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: studentId,
              profile_picture: data.url,
            }),
          }
        );
        const updatedStudent: student_type = await updateResponse.json();
        setStudent(updatedStudent);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  console.log(`http://localhost:6000/api/student/?id=${studentId}`);

  return (
    <div className="page">
      <div className="heading">
        <h2 className="welcome">Welcome to your Dashboard</h2>
        <h2 className="user-profile">User Profile</h2>
      </div>
      <div className="student-card-space">
        <div className="student-card">
          {/* Profile picture and change button remain unchanged */}

          <div className="profile-section">
            <div className="profile-pic">
              <img
                src={
                  editPictureMode
                    ? formData.profile_picture
                    : student.profile_picture
                }
                alt={student.name}
                className="profile-picture"
              />
            </div>
            <div className="change-pic-button">
              {/* {editPictureMode ? (
                <>
                  <input
                    type="text"
                    value={formData.profile_picture}
                    onChange={handlePictureChange}
                    placeholder="Enter new profile URL"
                  />
                  <div>
                    <Button variant="danger" onClick={handlePictureEdit}>
                      Cancel
                    </Button>
                    <span className="space"></span>
                    <Button variant="success" onClick={handlePictureSave}>
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  variant="primary"
                  onClick={handlePictureEdit}
                  style={{ width: "200px" }}
                >
                  Change Picture
                </Button>

                // <button onClick={handlePictureEdit}>Change Picture</button>
              )} */}
              <input
                type="file"
                id="fileInput"
                hidden
                onChange={handleImageUpload}
              />
              <Button
                variant="primary"
                onClick={() => document.getElementById("fileInput")?.click()}
                style={{ width: "200px" }}
              >
                Change Picture
              </Button>
            </div>
          </div>

          <div className="user-info">
            <form onSubmit={handleSubmit} className="user-details">
              <div className="studentName">
                <div className="name">Mr. {student.name}</div>
                <div className="role">Student</div>
              </div>

              <div className="info">
                {editMode ? (
                  <>
                    <div>
                      <label htmlFor="email">Email: </label>
                      <span className="space"></span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email" // Placeholder added for accessibility
                      />
                    </div>
                    <div>
                      <label htmlFor="age">Age: </label>
                      <span className="space"></span>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter age" // Placeholder added for accessibility
                      />
                    </div>
                    <div>
                      <label htmlFor="gender">Gender: </label>
                      <span className="space"></span>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>{" "}
                        {/* Default option added */}
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>Email: {student.email}</div>
                    <div>Age: {student.age}</div>
                    <div>Gender: {student.gender}</div>
                  </>
                )}
              </div>

              <div className="edit-button">
                {editMode ? (
                  <>
                    <Button variant="danger" onClick={handleEdit}>
                      Cancel
                    </Button>
                    <span className="space"></span>
                    <Button variant="success" type="submit">
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    style={{ width: "200px" }}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
