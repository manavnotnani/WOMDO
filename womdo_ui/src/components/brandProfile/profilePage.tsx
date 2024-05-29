import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface ProfileData {
  brandName: string;
  category: string;
  email: string;
  website: string;
  description: string;
  contactNumber: string;
}

const ProfilePage: React.FC<ProfileData> = ({ brandName, category, email, website, description, contactNumber }) => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card style={{borderRadius: '20px'}}>
            <Card.Body>
              <Card.Title>{brandName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Category: {category}</Card.Subtitle>
              <Card.Text>
                <strong>Email:</strong> {email}
                <br />
                <strong>Website:</strong> <a href={website}>{website}</a>
                <br />
                <strong>Description:</strong> {description}
                <br />
                <strong>Contact Number:</strong> {contactNumber}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
