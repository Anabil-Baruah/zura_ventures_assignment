import React, { useState } from 'react'
import Modals_uploadFile from '../modals/Modals_uploadFile'
import './uploadCards.scss'
import youtube from '../../assets/you-tube-icon.svg'
import Spotify from '../../assets/Spotify.svg'
import ellipse from '../../assets/empty-ellipse.svg'

const UploadCards = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [icon, setIcon] = useState(''); 
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleIcon = (icn) => {
        setIcon(icn);
        console.log(icn)
        
    }
    return (
        <>
            {isModalOpen && (<Modals_uploadFile
                handleOk={handleOk}
                handleCancel={handleCancel}
                isModalOpen={isModalOpen} 
                icon={icon}/>)}
            <div className="upload-cards">
                <div className="card"  onClick={() => { showModal(); handleIcon('youtube'); }}>
                    <img src={youtube} alt="" />
                    <div className="text">Upload you tube video</div>
                </div>
                <div className="card" onClick={() => { showModal(); handleIcon('spotify'); }}>
                    <img src={Spotify} alt="" />
                    <div className="text">Upload Spotify Podcast</div>
                </div>
                <div className="card" onClick={() => { showModal(); handleIcon('media'); }}>
                    <img src={ellipse} alt="" />
                    <div className="text">Upload Media or Text File</div>
                </div>
            </div>
        </>
    )
}

export default UploadCards