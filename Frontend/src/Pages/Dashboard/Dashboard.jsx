import React from 'react'

//import scss file
import "./dashboard.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'

const Dashboard = () => {
  return (
    <>
    <div className='dashboard-alignments'>
      <div className='left-alignment'>
        <Sidebar/>
      </div>
      <div className='right-alignment'>
        <div className='nav'>
          <Navbar type="dashboard"/>
        </div>
        <div>
            <h1>Dashboard Data</h1>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard