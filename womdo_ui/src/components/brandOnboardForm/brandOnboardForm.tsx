// components/BrandOnboardForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Container, Row, Col } from 'react-bootstrap';
import './brandOnboardForm.scss';
import Button from '../button/button';

interface FormValues {
  brandName: string;
  category: string;
  email: string;
  website: string;
  description: string;
  contactNumber: string;
}

const BrandOnboardForm: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      brandName: '',
      category: '',
      email: '',
      website: '',
      description: '',
      contactNumber: '',
    },
    validationSchema: Yup.object({
      brandName: Yup.string().required('Brand Name is required'),
      category: Yup.string().required('Category is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      website: Yup.string().url('Invalid URL').required('Website is required'),
      description: Yup.string().required('Description is required'),
      contactNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Contact Number must be numeric')
        .required('Contact Number is required'),
    }),
    onSubmit: values => {
      // Handle form submission
      console.log('Form data:', values);
    },
  });

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <div className="form-container">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="brandName" className="form-group">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps('brandName')}
                  isInvalid={!!formik.errors.brandName && formik.touched.brandName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.brandName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="category" className="form-group">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps('category')}
                isInvalid={!!formik.errors.category && formik.touched.category}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.category}
              </Form.Control.Feedback>
            </Form.Group>

              <Form.Group controlId="email" className="form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...formik.getFieldProps('email')}
                  isInvalid={!!formik.errors.email && formik.touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="website" className="form-group">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="url"
                  {...formik.getFieldProps('website')}
                  isInvalid={!!formik.errors.website && formik.touched.website}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.website}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="description" className="form-group">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...formik.getFieldProps('description')}
                  isInvalid={!!formik.errors.description && formik.touched.description}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="contactNumber" className="form-group">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps('contactNumber')}
                  isInvalid={!!formik.errors.contactNumber && formik.touched.contactNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.contactNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="form-button">
                <Button fluid className='custom_btn' type="submit">
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

export default BrandOnboardForm;
