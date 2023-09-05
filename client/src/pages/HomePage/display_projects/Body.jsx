import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './body.scss'
import Create_project from '../../../components/modals/Create_project'
import plus_logo from '../../../assets/plus_logo.svg'

const Body = ({ projects }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const openProject = (projectId) => {
        console.log(projectId)
        navigate(`/details/${projectId}`)
    }
    return (
        <>
            {isModalOpen && (<Create_project
                handleOk={handleOk}
                handleCancel={handleCancel}
                isModalOpen={isModalOpen}
            />)}
            <div className='dispaly_projects'>
                <div className="header-content">
                    <div className='header'>
                        <h1>Projects</h1>
                    </div>
                    <div className="right-btn">
                        <button className="btn" onClick={() => { showModal(); }}>
                            <div className="icon">
                                <img src={plus_logo} alt="" />
                            </div>
                            <div className="text">Create New Project</div>
                        </button>
                    </div>
                </div>

                <div className="projects">
                    {projects.map((project, index) => {
                        const name = project.projectName; // Assuming project has a title property
                        const words = name.split(" ");
                        let initials = "";

                        if (words.length >= 2) {
                            initials += words[0].charAt(0).toUpperCase();
                            initials += words[1].charAt(0).toUpperCase();
                        } else if (words.length === 1) {
                            initials += words[0].charAt(0).toUpperCase();
                        }

                        return (
                            <div className="project" key={index} onClick={() => { openProject(project._id) }}>
                                <div className="project-logo blue">{initials}</div>
                                <div className="title">
                                    <span className="heading">{project.projectName}</span>
                                    <span className="episodes">{project.uploads.length} episodes</span>
                                    <span className="last-edit">Last edited 1 day ago</span>
                                </div>
                            </div>
                        );
                    })}

                </div>

            </div>
        </>
    )
}

export default Body