import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaUserCog} label='All Products' address='all-products' />
      <MenuItem icon={FaUserCog} label='All Orders' address='all-orders' />
    </>
  )
}

export default AdminMenu
