import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
// import 'antd/dist/antd.css'; // Import Ant Design styles

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <section style={{ padding: '60px 0' }}>
      <Row justify="center" align="middle">
        <Col lg={12} md={24} sm={24} order={2}>
          <div style={{ padding: '0 30px' }}>
            <div style={{ marginBottom: '60px' }}>
              <Title level={2}>About Css3transition</Title>
              <Paragraph>
                I am Rahul Yaduvanshi, working at Css3 Transition since the last 3 years.
                We provide top-notch solutions for your website or web application to make it
                attractive and efficient by creating useful plugins that you need.
              </Paragraph>
              <Paragraph>
                We are here to serve you next-level tutorials that are currently in trend to
                match your expertise. Css3 transition is a learning website where you can find
                high-quality content related to web development and tutorials about plugins.
                We use HTML, HTML5, CSS, CSS3, jQuery, and JavaScript along with inspirational UI
                design layouts created by professionals using Photoshop and Adobe Illustrator.
              </Paragraph>
              <Button type="primary" href={`mailto:ugs21036_aids.vijayendher@cbit.org.in`} style={{ marginTop: '20px' }}>
              Contact Us
            </Button>
            </div>

            <div style={{ marginBottom: '45px' }}>
              <Title level={2}>Our Future Goal</Title>
              <Paragraph>
                We work on UI/UX and functionality to ensure that plugins come with proper
                structure and stunning looks that suit your web app and website.
              </Paragraph>
              <Paragraph>
                We take a small toolkit and use it well so that it fits your needs. We focus on
                performance and aesthetics.
              </Paragraph>
              <Paragraph>
                Here, we provide various technical content related to designing or functionality.
                We create content in many languages and offer it for free.
              </Paragraph>
              <Paragraph>
                You can also share the content you create, and if our technical team likes it, we
                will share it on our blog.
              </Paragraph>
              <Paragraph>
                In the end, keep visiting our website and enjoy the quality content.
              </Paragraph>
            </div>
          </div>
        </Col>

        <Col lg={12} md={24} sm={24}>
          <div style={{ position: 'relative', padding: '80px', paddingBottom: '0' }}>
            <img src="/aboutus.svg" alt="Rahul Kumar Yadav" style={{ maxWidth: '100%', height: 'auto' }} />
  
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default AboutUs;
