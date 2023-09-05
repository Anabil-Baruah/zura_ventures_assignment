import React , {useState} from 'react'
import './body.scss'
import avatar_home from '../../../assets/avatar_home.png'
import plus_logo from '../../../assets/plus_logo.svg'
import Create_project from '../../../components/modals/Create_project'


const Body = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {isModalOpen && (<Create_project
                handleOk={handleOk}
                handleCancel={handleCancel}
                isModalOpen={isModalOpen}
            />)}
            <div className="no-projects">
                <div className="header">
                    <h1>Create a New Project</h1>
                </div>
                <div className="avartar">
                    <img src={avatar_home} alt="" />
                </div>
                <div className="description">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in</p>
                </div>
                <div className="create-btn">
                    <button className="btn">
                        <div className="icon">
                            <img src={plus_logo} alt="" />
                        </div>
                        <div className="text" onClick={() => { showModal(); }}>Create New Project</div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Body