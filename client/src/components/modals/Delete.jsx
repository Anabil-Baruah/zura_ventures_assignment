import React, { useState } from 'react'
import { Button, Modal, Typography } from 'antd';
const { Title } = Typography;

const Delete = ({ handleOk, handleCancel, isModalOpen }) => {
  return (
    <Modal
      open={isModalOpen} onCancel={handleCancel}
      footer={[
        <Button danger onClick={handleCancel}>
          Delete
        </Button>
      ]}
    >
      <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Title>Are you sure you want to delete it ?</Title>
      </div>

    </Modal>
  )
}

export default Delete