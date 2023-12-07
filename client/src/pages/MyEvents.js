import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal ,Table} from 'antd';
import { Toaster, toast as toaster } from 'react-hot-toast'; // Correct import statement
import { useAuth0 } from '@auth0/auth0-react';
const EventDetailsTable = ({ selectedEvent }) => {
  const dataSource = [
    { label: 'Description', value: selectedEvent.description },
    { label: 'Event Date', value: selectedEvent.eventDate },
    { label: 'Event Type', value: selectedEvent.eventMode },
    { label: 'Expected Audience', value: selectedEvent.expectedAudience },
    { label: 'Ticket Price', value: selectedEvent.ticketPrice },
    { label: 'Tech Focus', value: selectedEvent.techFocus },
    { label: 'Agenda', value: selectedEvent.agenda },
    { label: 'Sponsor\'s Name', value: selectedEvent.sponsorName },
    { label: 'Sponsor\'s Link', value: selectedEvent.sponsorLink },
    { label: 'Registration Link', value: selectedEvent.registrationLink },
    { label: 'Host Name', value: selectedEvent.hostName },
    { label: 'Contact Email', value: selectedEvent.contactEmail },
    { label: 'Country', value: selectedEvent.country },
    { label: 'Street', value: selectedEvent.street },
    { label: 'City', value: selectedEvent.city },
    { label: 'Zip Code', value: selectedEvent.zipCode },
    { label: 'Social Link', value: selectedEvent.socialLink },
    { label: 'Host Permission Required', value: selectedEvent.hostPermission },
    { label: 'Target Audience', value: selectedEvent.targetAudience },
  ];

  const columns = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      bordered
      pagination={false}
      showHeader={false}
      size="middle"
      style={{ marginBottom: '20px' }}
    />
  );
};

const MyEvents = () => {
  const {user,isAuthenticated,getAccessTokenSilently}=useAuth0();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [selectedEvent, setSelectedEvent] = useState(null); // Correct usage

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
          toaster.promise(promise, {
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
  const openPopup = (event) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  const loadMore = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 3);
  };

  return (
    <div style={{ marginLeft: '20px', marginRight: '20px' }}>
      <h2 style={{ textAlign: 'center',marginBottom:'20px' }}>My Events</h2>

      {events.length === 0 ? (
        <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '20px' ,marginTop:'50px'}}>
        No events found. 😞
      </div>
      ) : (
        <Row gutter={[16, 16]}>
        {events.slice(0, visibleEvents).map((event, index) => (
          <Col key={index} md={8}>
            <div
              style={{
                borderRadius: '5px',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#fff',
                marginBottom: '16px',
                marginLeft: '8px',
                marginRight: '8px',
              }}
            >
              <Card>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{event.eventName}</h2>
                <img src={`data:image/jpeg;base64,${event.eventBanner}`} alt="Event Banner" style={{ width: '100%', marginBottom: '10px' }} />
                <p><strong className="event-info">Event Date:</strong> {event.eventDate}</p>
                <p><strong className="event-info">Event Type:</strong> {event.eventMode}</p>

                <Button onClick={() => openPopup(event)}>Show Details</Button>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      )}
      

      {visibleEvents < events.length && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}

{selectedEvent && (
        <Modal
          open={true}
          onCancel={closePopup}
          footer={[
            <Button key="close" onClick={closePopup}>
              Close
            </Button>,
          ]}
          width={800}
        >
          <h2>{selectedEvent.eventName}</h2>
          <img
            src={`data:image/jpeg;base64,${selectedEvent.eventBanner}`}
            alt="Event Banner"
            style={{ width: '100%', marginBottom: '10px' }}
          />

          <EventDetailsTable selectedEvent={selectedEvent} />
        </Modal>
      )}

      <Toaster position='bottom-right' />
    </div>
  );
};

export default MyEvents;
