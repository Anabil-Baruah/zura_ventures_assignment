import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import { message } from 'antd'
import NoProjects from './no_projects/Body';
import DispalyProjects from './display_projects/Body';
import AuthModal from '../../components/modals/Authenticate';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(!isAuthenticated); // Show modal if not authenticated
    const [projects, setProjects] = useState([])
    const { auth } = useAuth();

    useEffect(() => {
        if (auth?.accessToken) {
            setIsAuthenticated(true)
            setIsModalVisible(false)
        }

        axios.get('/project/get_project')
            .then((response) => {
                setProjects(response.data?.projects)
            })
            .catch((err) => {
                message.error(err.response.data.message)
            })
    }, [])

    const handleAuthentication = () => {
        setTimeout(() => {
            setIsAuthenticated(true);
            setIsModalVisible(false); // Close the modal after successful authentication
        }, 2000); // Simulate a 2-second delay (remove in a real implementation)
    };

    return (
        <>
            <Header />
            <div className='home-main-body'>
                {isAuthenticated ? (
                    projects.length > 0 ? (
                        <DispalyProjects projects={projects} />
                    ) : (
                        <NoProjects />
                    )
                ) : (
                    <NoProjects />
                )}
            </div>
            <AuthModal
                visible={isModalVisible}
                onCancel={null} // Set onCancel to null to prevent modal closure
                onAuthenticate={handleAuthentication}
            />
        </>
    );
};

export default Home;
