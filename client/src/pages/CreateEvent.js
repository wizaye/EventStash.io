import React, { useState } from 'react';
import { Form, Button, Col, Row, Input, Select, Upload, DatePicker, Radio, message, Divider } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import './CreateEvent.css';
import {Toaster , toast } from 'react-hot-toast'
const { Option } = Select;

const CreateEvent = () => {
  const { user } = useAuth0();
  const [eventBanner, setEventBanner] = useState(null);
  const [registrationLink, setRegistrationLink] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [eventMode, setEventMode] = useState('virtual');
  const [expectedAudience, setExpectedAudience] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [techFocus, setTechFocus] = useState('');
  const [agenda, setAgenda] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorLink, setSponsorLink] = useState('');
  const [hostName, setHostName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [hostPermission, setHostPermission] = useState('yes');
  const [targetAudience, setTargetAudience] = useState('');


  const handleBannerUpload = (file) => {
    setEventBanner(file); // Set the eventBanner state with the uploaded file
    setUploadedFileName(file.name);
  };

  const onFinish = async (values) => {
    // Create a promise to handle success and error responses
    const promise = new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('userEmail', user.email);
  
      // Append all input values to formData
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
  
      // Append eventBanner only if it exists
      if (eventBanner) {
        formData.append('eventBanner', eventBanner.file);
      }
  
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/create-event`, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          setRegistrationLink(data.registrationLink);
          // Resolve the promise with success message
          resolve('Event created successfully!');
        } else {
          // Reject the promise with the error message
          reject('Failed to create event. Please try again.');
        }
      } catch (error) {
        console.error('Error creating event:', error);
        // Reject the promise with a generic error message
        reject('An error occurred. Please try again.');
      }
    });
  
    // Use toast.promise() to display loading, success, and error messages
    toast.promise(promise, {
      loading: 'Creating event...',
      success: (message) => <b>{message}</b>, // Display the resolved success message
      error: (message) => <b>{message}</b>,   // Display the rejected error message
    });
  };


  return (
    <div className="create-event-container">
      <Form
        name="createEventForm"
        onFinish={onFinish}
        encType="multipart/form-data"
        className="create-event-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
         <h3>Event Information</h3>
         <Divider orientation="left">
         
         </Divider>
        
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item label="Event Name" name="eventName" rules={[{ required: true, message: 'Please enter Event Name' }]}>
              <Input value={eventName} onChange={(e) => setEventName(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter Description' }]}>
              <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
       
        <h3>Event Details</h3>
        <Divider orientation="left">
         
         </Divider>
        
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item label="Event Mode" name="eventMode" rules={[{ required: true, message: 'Please select Event Mode' }]}>
              <Select value={eventMode} onChange={(value) => setEventMode(value)} style={{ width: '100%' }}>
                <Option value="virtual">Virtual</Option>
                <Option value="inperson">In-Person</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Expected Audience"
              name="expectedAudience"
              rules={[{ required: true, message: 'Please enter Expected Audience' }]}
            >
              <Input type="number" value={expectedAudience} onChange={(e) => setExpectedAudience(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item label="Ticket Price" name="ticketPrice" rules={[{ required: true, message: 'Please enter Ticket Price' }]}>
              <Input type="number" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Tech Focus" name="techFocus" rules={[{ required: true, message: 'Please enter Tech Focus' }]}>
              <Input value={techFocus} onChange={(e) => setTechFocus(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item label="Agenda" name="agenda" rules={[{ required: true, message: 'Please enter Agenda' }]}>
              <Input.TextArea value={agenda} onChange={(e) => setAgenda(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Sponsor's Name" name="sponsorName" rules={[{ required: true, message: "Please enter Sponsor's Name" }]}>
              <Input value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item
              label="Event Banner (PNG or JPG)"
              name="eventBanner"
              rules={[{ required: true, message: 'Please upload Event Banner' }]}
            >
              <Upload
                accept=".png, .jpg, .jpeg"
                beforeUpload={() => false}
                showUploadList={false}
                fileList={eventBanner ? [eventBanner] : []}
                onChange={handleBannerUpload}
              >
                <Button >Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={10}>
            {uploadedFileName && <p>Uploaded File: {uploadedFileName}</p>}
          </Col>
        </Row>
        

        <h3>Contact Details</h3>
        <Divider orientation="left">
          
        </Divider>
        
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item
              label="Host Name"
              name="hostName"
              rules={[{ required: true, message: 'Please enter Host Name' }]}
            >
              <Input value={hostName} onChange={(e) => setHostName(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Event Date"
              name="eventDate"
              rules={[{ required: true, message: 'Please select Event Date' }]}
            >
              <DatePicker style={{ width: '100%' }} onChange={(date, dateString) => setEventDate(dateString)} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item
              label="Contact Email Address"
              name="contactEmail"
              rules={[{ required: true, message: 'Please enter Contact Email Address' }]}
            >
              <Input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please enter Country' }]}>
              <Input value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item label="Street" name="street" rules={[{ required: true, message: 'Please enter Street' }]}>
              <Input value={street} onChange={(e) => setStreet(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter City' }]}>
              <Input value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item label="State" name="state" rules={[{ required: true, message: 'Please enter State' }]}>
              <Input value={state} onChange={(e) => setState(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Zip Code" name="zipCode" rules={[{ required: true, message: 'Please enter Zip Code' }]}>
              <Input value={zipCode} onChange={(e) => setZipCode(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        
        <h3>Additional Information</h3>
        <Divider orientation="left">
          
        </Divider>
        
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item label="Social Link" name="socialLink">
              <Input value={socialLink} onChange={(e) => setSocialLink(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Host Permission Required"
              name="hostPermission"
              rules={[{ required: true, message: 'Please select Host Permission' }]}
            >
              <Radio.Group onChange={(e) => setHostPermission(e.target.value)} value={hostPermission}>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item
              label="Target Audience"
              name="targetAudience"
              rules={[{ required: true, message: 'Please enter Target Audience' }]}
            >
              <Input type="number" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset:1, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Create Event
          </Button>
        </Form.Item>

        {registrationLink && (
          <div className="registration-link">
            <p>Registration Link:</p>
            <a href={registrationLink} target="_blank" rel="noopener noreferrer">
              {registrationLink}
            </a>
          </div>
        )}
      </Form>
      <Toaster position='bottom-right'/>
    </div>
  )};
  export default CreateEvent;
