import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col,Modal } from 'antd';
import { EditOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { toast, Toaster } from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';

const { Meta } = Card;

const ManageEvents = () => {
  const{user,isAuthenticated,getAccessTokenSilently}=useAuth0()
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently();

          const promise = new Promise(async (resolve, reject) => {
            try {
              const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/get-events`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ userEmail: user.email }),
              });

              if (response.ok) {
                const eventData = await response.json();
                setEvents(eventData);
                resolve('Events data fetched successfully!');
              } else {
                reject('Failed to fetch events data.');
              }
            } catch (error) {
              console.error('Error:', error);
              reject('Error fetching events data.');
            } finally {
              setLoading(false);
            }
          });

          // Use toast.promise() to display loading, success, and error messages
          toast.promise(promise, {
            loading: 'Fetching events data...',
            success: (message) => <b>{message}</b>,
            error: (message) => <b>{message}</b>,
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEvents();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  const EventCard = ({ event }) => {
    const editEventDetails = () => {
      // Implement edit functionality
    };

    const deleteEvent = async (eventId, eventName) => {
      try {
        await new Promise((resolve) => {
          Modal.confirm({
            title: 'Confirmation',
            content: `Are you sure you want to delete the event "${eventName}"? This action cannot be undone.`,
            onOk: async () => {
              try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/delete-event/${eventId}`, {
                  method: 'DELETE',
                });
  
                if (response.ok) {
                  toast.success('Event deleted successfully.');
                  // Remove the deleted event from the state
                  setEvents((prevEvents) => prevEvents.filter((e) => e._id !== eventId));
                } else {
                  console.error('Failed to delete event.');
                  toast.error('Failed to delete event. Please try again.');
                }
              } catch (error) {
                console.error('Error:', error);
                toast.error('Failed to delete event. Please try again.');
              } finally {
                resolve(); // Resolve the promise to close the modal
              }
            },
            onCancel: () => {
              resolve(); // Resolve the promise to close the modal
            },
          });
        });
      } catch (error) {
        console.error('Error showing delete confirmation dialog:', error);
      }
    };
    

    const downloadAttendeesData = async (eventId,eventName) => {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/api/download-user-data/${eventId}`);
        if (response.ok) {
          // Convert the response to a blob
          const blob = await response.blob();

          // Create a link to download the blob
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${eventName}_attendes_details.xlsx`;
          link.click();

          toast.success('Download Successful');
        } else {
          console.error('Failed to download attendees data.');
          toast.error('Failed to download attendees data');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to download attendees data');
      }
    };

    return (
      <Col xs={24} sm={24} md={12} lg={12} xl={9} xxl={9} key={event._id} style={{ marginBottom: '16px', marginTop: '16px' }}>
        <Card
          title={event.eventName}
          actions={[
            <Button type="" block icon={<EditOutlined />} onClick={editEventDetails}>
              Edit
            </Button>,
            <Button type="danger" block icon={<DeleteOutlined />} onClick={() => deleteEvent(event._id, event.eventName)}>
            Delete
          </Button>,
            <Button type="info" block onClick={() => downloadAttendeesData(event._id,event.eventName)} icon={<DownloadOutlined />}>
              User Data
            </Button>,
          ]}
        >
          <Meta title={<strong>Event Date:</strong>} description={event.eventDate} />
          <Meta title={<strong>Event Type:</strong>} description={event.eventMode} />
        </Card>
      </Col>
    );
  };

  return (
    <div className="my-events-container" style={{ marginTop: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Your Events</h2>

      {events.length===0 ? (
        <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '20px',marginTop:'50px'}}>
        No events found. 😞
      </div>
       
      ) : (
        <div style={{ padding: '0 10px' }}>
          <Row gutter={[16, 16]} justify="center">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </Row>
        </div>
      )}
      <Toaster position="bottom-right" />

      {/* ... (your existing code for confirmation modals) */}
    </div>
  );
};

export default ManageEvents;

