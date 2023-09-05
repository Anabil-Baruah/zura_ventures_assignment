import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, message } from 'antd'
import axios from '../../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { formatArrayOfObjects, formatDate } from '../../utils/formatDate'
import UploadFile from '../uploadFile/UploadFile'


const TableFields = () => {
    const [dataSource, setData] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`/project/get_all_fields/${id}`)
            .then((res) => {
                const formattedArray = formatArrayOfObjects(res.data?.uploads);
                setData(formattedArray);
            })
            .catch((err) => console.log(err));
    }, [id]);


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Upload Date & Time',
            dataIndex: 'dateOfCreation',
            key: 'dateOfCreation',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button type="primary" ghost onClick={() => handleEdit(record)}>Edit</Button> &nbsp;
                    <Button danger onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const handleEdit = (record) => {
        console.log(record)
        navigate(`/details/${id}/transcript/${record._id}`)
    }
    const handleDelete = (record) => {
        console.log(record)
        Modal.confirm({
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this record?',
            onOk() {
                // Send a delete request to the server to delete the record
                axios
                    .post(`/project/delete_field`, { id: record._id, projectId: id })
                    .then(() => {
                        // If the delete request is successful, remove the record from the local state
                        const updatedDataSource = dataSource.filter((item) => item._id !== record._id);
                        setData(updatedDataSource);
                        message.success(`${record.name} deleted successfully`);
                    })
                    .catch((err) => {
                        message.error('Error deleting record');
                    });
            },
            onCancel() {
                // Cancel the deletion
            },
        });
    }
    return (
        <>
            {dataSource.length ? (
                <Table dataSource={dataSource} columns={columns} />
            ) : (
                <UploadFile />
            )}
        </>
    )
}

export default TableFields