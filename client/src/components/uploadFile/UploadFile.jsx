import React from 'react'
import './uploadFile.scss'
import CloudUpload from '../../assets/cloud_upload.svg'

const UploadFile = () => {
    return (
        <div className='upload-file-box' >
            <img src={CloudUpload} alt="" />
            <div className='text'>Select a file or drag and drop here Podcast Media or Transcription Text</div>
            <div className='text-2'>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</div>
            <label for="fileInput" id="fileInputLabel">
                <div className="select-file-btn">Choose a file</div>
                
                {/* <input type="file" id="fileInput" style={{ display: 'none' }} /> */}
            </label>

        </div>
    )
}

export default UploadFile