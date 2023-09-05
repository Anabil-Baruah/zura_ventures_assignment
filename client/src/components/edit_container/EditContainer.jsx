import React, { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import './editContainer.scss';
import SearchIcon from '../../assets/search_icon.svg';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import TextArea from 'antd/es/input/TextArea';

const EditContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const navigate = useNavigate()
  const { id, recordId } = useParams()

  useEffect(() => {
    axios.get(`/project/edit_field/${id}/${recordId}`)
      .then((res) => {
        console.log(res.data?.transcript)
        setEditedText(res.data?.transcript)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };
  const handleInputChange = () => {
    console.log(isEditing)
    setEditedText(document.querySelector('.transcript').innerText)
  }
  const saveEditChnages = () => {
    axios.post('/project/save_edit_field', { id, recordId, transcript: editedText })
      .then((response) => {
        if (response.status === 200) {
          message.success('Saved Successfully')
        } else {
          message.error('Something went wrong')
        }
      })
      .catch((err) => {
        message.error('Something went wrong')
      })
  }

  return (
    <>
      <div className="btn-container">
        <Button
          onClick={() => navigate(`/details/${id}`)}
          danger
          style={{ fontWeight: '500', fontSize: '1rem' }}>
          Discard
        </Button>
        <Button
          style={{ color: '#fff', backgroundColor: '#211935' }}
          onClick={saveEditChnages}
        >
          Save changes
        </Button>
      </div>
      <div className='edit-project' >
        <div className="header" style={{ width: '100%' }}>
          {!isEditing ? (
            <div className="edit-btn" onClick={() => { setIsEditing(true); }}>
              Enable Edit
            </div>
          ) : (
            <div className="edit-btn" onClick={handleSaveClick}>
              Disable Edit
            </div>
          )}
          <div className="icon">
            <img src={SearchIcon} alt="" />
          </div>
        </div>
        <div className="content"  >
          <textarea className='transcript'
            outline='none'
            disabled={!isEditing}
            style={{ outline: 'none' }}
            onChange={(e) => { setEditedText(e.target.value) }}
            value={editedText}
          />

        </div>
      </div>
    </>
  );
};

export default EditContainer;
