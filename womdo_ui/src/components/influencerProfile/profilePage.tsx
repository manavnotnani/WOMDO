import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface ProfileData {
  channelName: string;
  category: string;
  email: string;
  channelLink: string;
  subscribers: number;
  description: string;
  contactNumber: string;
}

const ProfilePage: React.FC<ProfileData> = ({ channelName, category, email, channelLink, subscribers, description, contactNumber }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card style={{borderRadius: '20px'}}>
            <Card.Body>
              <Card.Title>{channelName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Category: {category}</Card.Subtitle>
              <Card.Text>
                <strong>Email:</strong> {email}
                <br />
                <strong>Channel Link:</strong> <a href={channelLink}>{channelLink}</a>
                <br />
                <strong>Subscribers:</strong> {subscribers}
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
