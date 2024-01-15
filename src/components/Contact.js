import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ContactSection = () => {
  const phoneNumber = '+94812260782';
  const email = 'peracom@eng.pdn.ac.lk';
  const address_text = 'Department of Computer Engineering, Faculty of Engineering, University of Peradeniya.';
  const address = '7H3R+VG5, Peradeniya, Sri Lanka';
  return (
    <section className="contact-section" style={{ backgroundColor: '#e1f7ff ', color: '#0e4b62', marginTop: '20px', padding: '20px' }}>
      <Container>
        

        <Row>
          <Col md={8}>
            <div>
                <h2 className="section-heading">Contact Us</h2>
                <p className="section-subheading">We would love to hear from you!</p>
            </div>
            <div className="contact-info">
              <p>Tel: <a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
              <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
              <p>Address: {address_text}</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="map-container">
              <iframe
                title="Google Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                width="100%"
                height="200"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;
