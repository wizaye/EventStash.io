import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Space, Typography } from "antd";
import { EditOutlined, ShareAltOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [randomQuote, setRandomQuote] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  useEffect(() => {
    // Replace with your own endpoint or data source for quotes
    const quotes = [
      "Life is what happens when you're busy making other plans. - John Lennon",
      "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
      "Strive not to be a success, but rather to be of value. - Albert Einstein",
      // Add more quotes as needed
    ];

    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    };

    setRandomQuote(getRandomQuote());

    // Fetch a random image from Unsplash
    fetch("https://source.unsplash.com/1600x400/?event")
      .then((response) => setCoverImageUrl(response.url))
      .catch((error) => console.error("Error fetching image:", error));
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const profileContainerStyle = {
    marginTop: "20px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
  };

  const coverImageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
  };

  const profileImageStyle = {
    width: "100%",
    maxWidth: "200px",
    height: "auto",
    borderRadius: "50%",
    border: "4px solid #fff",
  };

  const profileDetailsStyle = {
    padding: "20px",
    color: "#333",
  };

  const h1Style = {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#2c3e50",
  };

  const usernameStyle = {
    fontSize: "16px",
    color: "#555",
  };

  const profileButtonsStyle = {
    marginTop: "20px",
  };

  const buttonStyle = {
    marginRight: "10px",
  };

  return (
    isAuthenticated && (
      <Container style={profileContainerStyle}>
        <img
          src={coverImageUrl}
          alt="Cover"
          style={coverImageStyle}
        />

        <Row>
          <Col md={4} style={profileImageStyle}>
            <Avatar src={user.picture} alt={user.name} size={200} />
          </Col>
          <Col md={8} style={profileDetailsStyle}>
            <Title level={3} style={h1Style}>{user.name}</Title>
            <Text style={usernameStyle}>{user.name}</Text>
            <Space direction="vertical">
              <Text>{randomQuote}</Text>
              <div style={profileButtonsStyle}>
                <Button icon={<ShareAltOutlined />} style={buttonStyle}>
                  Share
                </Button>
                <Button icon={<EditOutlined />} style={buttonStyle}>
                  Edit Profile
                </Button>
              </div>
            </Space>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Profile;
