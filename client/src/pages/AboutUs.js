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
              <Title level={2}>About Event Stash</Title>
              <Paragraph style={{fontSize:18}}>
              Event Stash marks their ambitious endeavor to transform the event management scene. This project aims to:
Streamline Event Management: By introducing innovative features and user-friendly interfaces, Event Stash seeks to simplify and streamline the entire event management process.
Enhance Attendee Experience: From registration to engagement, Event Stash prioritizes the attendee experience, aiming to make it more interactive and enjoyable.
Promote Sustainability: In line with their core values, Event Stash incorporates sustainable practices into its design, minimizing environmental impact.
</Paragraph>
<Title level={2}>About Dev's</Title>
              <Paragraph style={{fontSize:18}}>
              Meet <b>Khizar</b>, <b>Vijay</b>, and <b>Lokesh</b> ,<br></br>A passionate trio of tech enthusiasts driven by a desire for positive change. Their team, thrives on innovative ideas and seeks to revolutionize the event management landscape with their groundbreaking Event Stash project.
              </Paragraph>
              

            <div style={{ marginBottom: '45px' }}>
              <Title level={2}>Our Future Goal's</Title>
              <Paragraph style={{fontSize:18}}>
              <li>Include Payment GateWay</li>

              </Paragraph>
              <Paragraph style={{fontSize:18}}>
              <li> AI-Driven Personalization</li>
             
              
              </Paragraph>
              <Paragraph style={{fontSize:18}}>
                <li>Enhanced Social Media Integration</li>
              
              
              </Paragraph>
              <Paragraph style={{fontSize:18}}>
                <li>Blockchain for Ticketing and Security</li>
              
             
              </Paragraph>
              <Paragraph style={{fontSize:18}}>
              <li>Virtual and Hybrid Event Support</li>
              </Paragraph>
              <Button type="primary" href={`mailto:ugs21036_aids.vijayendher@cbit.org.in`} style={{ marginTop: '20px' }}>
              Contact Us
            </Button>
            </div>

             
              
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
