import SidebarNav from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="flex">
      <section className="flex flex-1 h-full">
        <SidebarNav />
        <Outlet />
      </section>
    </div>
  )
}

export default Dashboard