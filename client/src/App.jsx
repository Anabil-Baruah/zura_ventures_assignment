import React, { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage, ProjectUploads } from './pages'
import { RequireAuth } from './components'

function App() {
  const detailProps = {
    header: 'Sample Project',
    navigator: 'Upload',
    uploadCards: true,
    dispalyTable: true,
    showConfig: false,
    showTranscript: false
  }
  const configurationProps = {
    header: 'Configuration',
    navigator: 'Widget Configuration',
    uploadCards: false,
    dispalyTable: false,
    showConfig: true,
    showTranscript: false
  }
  const transcriptProps = {
    header: 'Edit Transcript',
    navigator: 'Transcript',
    uploadCards: false,
    dispalyTable: false,
    showConfig: false,
    showTranscript: true
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route element={<RequireAuth />}>
          <Route exact path="/details/:id" element={<ProjectUploads {...detailProps} />} />
          <Route exact path="/details/:id/transcript/:recordId" element={<ProjectUploads {...transcriptProps} />} />
          <Route exact path="/details/:id/configuration" element={<ProjectUploads {...configurationProps} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
