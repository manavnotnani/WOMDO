// components/BrandOnboardForm.tsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Container, Row, Col } from "react-bootstrap";
import "./influencerOnboardForm.scss";
import Button from "../button/button";

interface FormValues {
  channelName: string;
  category: string;
  email: string;
  channelLink: string;
  subscribers: string;
  description: string;
  contactNumber: string;
}

const InfluencerOnboardForm: React.FC = () => {
  const categories = [
    "Music",
    "Lifestyle",
    "Education",
    "Sports",
    "Gaming",
    "News",
    "Comedy",
    "Entertainment",
    "Film & Animation",
    "Science & Technology",
    "Travel & Events",
  ];
  const formik = useFormik<FormValues>({
    initialValues: {
      channelName: "",
      category: "",
      email: "",
      channelLink: "",
      subscribers: "",
      description: "",
      contactNumber: "",
    },
    validationSchema: Yup.object({
      channelName: Yup.string().required("Channel Name is required"),
      category: Yup.string().required("Category is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      channelLink: Yup.string()
        .url("Invalid URL")
        .required("Channel link is required"),
      subscribers: Yup.string().required("Subscribers is required"),
      description: Yup.string().required("Description is required"),
      contactNumber: Yup.string()
        .matches(/^[0-9]+$/, "Contact Number must be numeric")
        .required("Contact Number is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log("Form data:", values);
    },
  });

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <div className="form-container">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="channelName" className="form-group">
                <Form.Label>Channel Name</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("channelName")}
                  isInvalid={
                    !!formik.errors.channelName && formik.touched.channelName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.channelName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="category" className="form-group">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  {...formik.getFieldProps("category")}
                  isInvalid={
                    !!formik.errors.category && formik.touched.category
                  }
                >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="email" className="form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...formik.getFieldProps("email")}
                  isInvalid={!!formik.errors.email && formik.touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="channelLink" className="form-group">
                <Form.Label>Channel Link</Form.Label>
                <Form.Control
                  type="url"
                  {...formik.getFieldProps("channelLink")}
                  isInvalid={
                    !!formik.errors.channelLink && formik.touched.channelLink
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.channelLink}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group controlId="subscribers" className="form-group">
                <Form.Label>Subscribers</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("subscribers")}
                  isInvalid={
                    !!formik.errors.subscribers && formik.touched.subscribers
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.subscribers}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="description" className="form-group">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...formik.getFieldProps("description")}
                  isInvalid={
                    !!formik.errors.description && formik.touched.description
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="contactNumber" className="form-group">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("contactNumber")}
                  isInvalid={
                    !!formik.errors.contactNumber &&
                    formik.touched.contactNumber
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.contactNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="form-button">
                <Button fluid className="custom_btn" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default InfluencerOnboardForm;
