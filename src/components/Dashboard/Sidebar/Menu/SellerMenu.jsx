import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Products'
        address='add-products'
      />
      <MenuItem icon={MdHomeWork} label='Manage Products' address='manage-products' />
      <MenuItem icon={MdHomeWork} label='Approved Orders' address='approved-orders' />
      <MenuItem icon={MdHomeWork} label='Pending Orders' address='pending-orders' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      />
    </>
  )
}

export default SellerMenu
