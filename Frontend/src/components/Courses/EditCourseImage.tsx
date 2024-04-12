import React, { useState, useEffect } from 'react';
import { Card, Spinner, Button } from 'react-bootstrap';
import { CloudinaryUploadAPI, updateCourseImageAPI, getCourseAllInfoAPI } from '../../constant';
import axios from 'axios';

interface Props {
  courseId: string;
}

function EditCourseImage({ courseId }: Props) {
  const [courseImage, setCourseImage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${getCourseAllInfoAPI}?courseId=${courseId}`)
      .then(response => {
        const { imageUrl } = response.data;
        setCourseImage(imageUrl);
      })
      .catch(error => console.error("Failed to fetch course", error));
  }, [courseId]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gpt_edtech360");

    setIsUploading(true);

    try {
      const response = await fetch(CloudinaryUploadAPI, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setCourseImage(data.url);
      await updateCourseImageOnBackend(courseId, data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const updateCourseImageOnBackend = async (courseId: string, imageUrl: string) => {
    try {
      const response = await axios.post(updateCourseImageAPI, {
        courseId,
        imageUrl,
      });
      console.log("Course image updated successfully", response.data);
    } catch (error) {
      console.error("Error updating course image:", error);
    }
  };

  return (
    <Card border="primary" className="mx-auto mt-3 mb-3">
      <Card.Body>
        <Card.Title className="display-6 text-center fw-bold text-primary">
          Course Image
        </Card.Title>
        {courseImage && (
          <div className="text-center mb-3">
            <img
              src={courseImage}
              alt="Current Course"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="courseImage" className="form-label fw-bold text-primary">
            Upload New Course Image
          </label>
          <input
            type="file"
            className="form-control"
            id="courseImage"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          {isUploading && <Spinner animation="border" variant="primary" />}
        </div>
      </Card.Body>
    </Card>
  );
}

export default EditCourseImage;
