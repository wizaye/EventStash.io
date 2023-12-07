import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Dashboard = () => {
    const history = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const currentHour = currentTime.getHours();
    setGreeting(getGreeting(currentHour));

    return () => clearInterval(intervalId);
  }, [currentTime]);

  const getGreeting = (hour) => {
    if (hour >= 5 && hour < 12) return 'Good Morning';
    else if (hour >= 12 && hour < 17) return 'Good Afternoon';
    else return 'Good Evening';
  };

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: '50px',
      padding: '40px',
    },
    content: {
      flex: 1,
      textAlign: 'left',
    },
    image: {
      flex: 1,
      marginLeft: '20px',
      height: '70%',
      maxWidth: '50%',
    },
    title: {
      textAlign: 'left',
      color: '#000',
      fontSize: '60px',
      marginBottom: '20px', // Added margin at the bottom
    },
    text: {
      fontSize: '18px',
      textAlign: 'left',
      color: '#000',
    },
    buttonContainer: {
      marginTop: '20px',
      textAlign: 'left',
    },
    button: {
      width: '80%',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Title level={2} style={styles.title}>
          {greeting}
        </Title>
        <Text style={{ ...styles.text, marginTop: '10px' }}>Time: {currentTime.toLocaleTimeString()}</Text>

        <Row style={styles.buttonContainer}>
          <Col span={5} style={styles.button}>
            <Button type="primary" size="large" onClick={()=>history('/dashboard/createvnt')}>
              Create Event
            </Button>
          </Col>
          <Col span={12} style={styles.button}>
            <Button type="default" size="large" onClick={()=>history('/dashboard/myevnts')}>
              My Events
            </Button>
          </Col>
        </Row>
      </div>
      <img src="/welcome.svg" alt="Vector Image" style={styles.image} />
    </div>
  );
};

export default Dashboard;
