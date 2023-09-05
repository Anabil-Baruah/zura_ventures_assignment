import React, { useState } from 'react'
import { Button, Modal, Form, Input, message } from 'antd';
import axios from "../../utils/axios";

const Create_project = ({ handleOk, handleCancel, isModalOpen }) => {
    const [projectName, setProjectName] = useState('')

    const submitName = () => {
        axios.post('/project/create_project', { projectName })
            .then(response => {
                if (response.status === 200) {
                    message.success(`${projectName} created succesfully`)
                    handleOk();
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    message.error('Something went wrong. Please try again.')
                }
            })
            .catch(error => {
                // console.error('Error:', error.response.data);
                message.error(error.response.data.message)
            })
    }

    return (
        <Modal
            open={isModalOpen} onCancel={handleCancel}
            footer={[
                <Button style={{ color: '#fff', backgroundColor: '#211935' }} onClick={submitName}>
                    Create
                </Button>
            ]}
        >
            <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Create Project</h2>
            </div>
            <Form
                style={{ width: '100%', marginTop: '2rem' }}
                layout="vertical"
            >
                <Form.Item name="name" label="Name">
                    <Input size='large' onChange={(e) => setProjectName(e.target.value)} />
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default Create_project