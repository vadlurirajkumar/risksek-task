import React from 'react'

// import scss file
import "./settings.scss"

import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'

const Settings = () => {
  return (
    <>
       <div className="settings-alignments">
        <div className="left-alignment">
          <Sidebar />
        </div>
        <div className="right-alignment">
          <div className="nav">
            <Navbar type="settings" />
          </div>
          <div>
            <h1>Settings Data</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings