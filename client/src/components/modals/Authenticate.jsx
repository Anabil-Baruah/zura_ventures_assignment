import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import axios from "../../utils/axios";
import useAuth from '../../hooks/useAuth'


const AuthenticationModal = ({ visible, onCancel, onAuthenticate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth()
    const [form] = Form.useForm();

    const createAccount = () => {
        const values = { username, password }
        axios.post('/register', values)
            .then(response => {
                console.log('Response:', response);
                if (response.status === 200) {
                    const accessToken = response?.data?.message.accessToken;
                    login(accessToken, values.username)
                    message.success(`Welcome ${values.username}`)
                    onAuthenticate();
                } else {
                    message.error('Something went wrong. Please try again.')
                }
            })
            .catch(error => {
                // console.error('Error:', error.response.data);
                message.error(error.response.data.message)
                form.resetFields()
            })
            .finally(() => {
                form.resetFields()
                // setLoading(false);
            });
        
    };

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="authenticate" type="primary" onClick={createAccount}>
                    Create Account
                </Button>,
            ]}
        >
            <h2 style={{margin:'1rem 0 1rem 0'}}>Create an account</h2>
            <Form>
                <Form.Item label="Username">
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Password">
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AuthenticationModal;
