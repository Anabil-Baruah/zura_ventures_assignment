import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from '../../utils/axios';
import { useParams } from 'react-router-dom';

const General = () => {
  const { id } = useParams();
  const [form] = Form.useForm(); // Create a form instance

  useEffect(() => {
    // Fetch data and populate the form fields here if needed
    axios
      .get(`/project/config/get_general_field/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const { chatBotName, welcomeMessage, inputPlaceholder } = res.data;
          // Set form values
          form.setFieldsValue({ chatBotName, welcomeMessage, inputPlaceholder });
        } else {
          message.error(res.data?.message);
        }
      })
      .catch((err) => {
        message.error('Something went wrong');
      });
  }, [id, form]);

  const handleSubmit = (values) => {
    console.log(values)
    values.chatBotName = values.chatBotName || ""; 
    values.inputPlaceholder = values.inputPlaceholder || ""; 
    values.welcomeMessage = values.welcomeMessage || ""; 
    axios
      .post('/project/config/update_general_field', { id, ...values })
      .then((res) => {
        message.success('Updated Successfully');
      })
      .catch((err) => {
        message.error('Something went wrong');
      });
  };

  return (
    <div>
      <Form
        form={form} // Use the form instance
        style={{ width: '90%' }}
        layout="vertical"
        onFinish={handleSubmit} // Handle form submission
      >
        <Form.Item name="chatBotName" label="Chatbot Name">
          <Input size="large" />
        </Form.Item>

        <Form.Item name="welcomeMessage" label="Welcome Message">
          <Input size="large" />
        </Form.Item>

        <Form.Item name="inputPlaceholder" label="Input Placeholder">
          <Input size="large" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default General;
