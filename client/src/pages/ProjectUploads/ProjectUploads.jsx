import React from 'react'
import './projectUploads.scss'
import { Header_project_detail, UploadCards, EditContainer, Table } from '../../components'
import { Button, message } from 'antd'
import Configuration from './config-container/Configuration'
import ContentWrapper from '../../hoc/ContentWrapper'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../utils/axios'

const ProjectUploads = (detailProps) => {
  const navigate = useNavigate()
  const { id, recordId } = useParams()

 

  return (
    <ContentWrapper>
      <div className='project-uploads'>
        <Header_project_detail navigator={detailProps.navigator} />
      </div>

      <div className="main">
        <div className="header">
          <h1>{detailProps.header}</h1>
        </div>
        {detailProps.uploadCards &&
          (<div className="upload-section">
            <UploadCards />
          </div>)}
        {detailProps.dispalyTable && (<div className="dispaly-card card">
          <Table />
        </div>
        )}
        {/* <UploadFile /> */}
        {detailProps.showTranscript && <EditContainer/>}
        {detailProps.showConfig && (<Configuration />)}
      </div>
    </ContentWrapper>
  )
}

export default ProjectUploads