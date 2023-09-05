import React, { useState } from 'react'
import { Button, Modal, Form, Input, message } from 'antd';
import { useParams } from 'react-router-dom';
import youtube from '../../assets/you-tube-icon.svg'
import spotify from '../../assets/Spotify.svg'
import media from '../../assets/empty-ellipse.svg'
import axios from '../../utils/axios';

const Modals = ({ handleOk, handleCancel, isModalOpen, icon }) => {
    const [projectName, setProjectName] = useState('')
    const [link, setLink] = useState('')
    const [transcript, setTranscript] = useState('')
    const { id } = useParams()


    const addField = () => {
        axios.post('/project/add_field', { projectName, link, transcript, id })
            .then(response => {
                if (response.status === 200) {
                    handleOk();
                    message.success(`${projectName} added succesfully`)
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                } else {
                    message.error('Something went wrong. Please try again.')
                }
            })
            .catch(error => {
                message.error(error.response.data.message)
            })

    }
    return (
        <div>
            <Modal
                open={isModalOpen} onCancel={handleCancel}
                footer={[
                    <Button style={{ color: '#fff', backgroundColor: '#211935' }} onClick={addField}>
                        Upload
                    </Button>
                ]}
            >
                <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={icon === "youtube" ? youtube : (icon === "spotify" ? spotify : media)} alt="Icon" style={{ width: '50px', height: '50px' }} />
                    <h2 style={{ fontSize: '1.8rem' }}>Upload from {icon}</h2>
                </div>
                <Form
                    style={{ width: '100%', marginTop: '2rem' }}
                    layout="vertical"
                >

                    <Form.Item name="name" label="Name">
                        <Input size='large' onChange={(e) => { setProjectName(e.target.value) }} />
                    </Form.Item>

                    <Form.Item name="link" label="Link" onChange={(e) => { setLink(e.target.value) }}>
                        <Input size='large' />
                    </Form.Item>
                    <Form.Item name="transcript" label="Transcript" onChange={(e) => { setTranscript(e.target.value) }}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Modals