import React from 'react'
import { 
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineTablet
} from 'react-icons/ai'

import { Link, NavLink } from 'react-router-dom'

import {} from 'react'

const SideBar = () => {
  return (
    <React.Fragment>
      <div className='d-flex flex-column flex-shrink-0 p-3 bg-light' style={{ height: '100vh' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <span className="fs-4">Yuiko Jewerly</span>
        </a>
        <hr/>

        <ul className='nav nav-pills flex-column mb-auto'>
          <li className='nav-item'>
            <Link to="/admin" className="nav-link">
              <AiOutlineHome/>
              <span className='px-3'>Home</span>
            </Link>
          </li>

          <li>
            <a href="#productSubmenu" className="nav-link dropdown-toggle" data-bs-toggle="collapse">
              <AiOutlineShopping/>
              <span className='px-3'>Products</span>
            </a>
            <ul className="collapse list-unstyled " id="productSubmenu">
              <li className='nav-item ps-5'>
                <Link to="/admin/products" className="nav-link">
                  All
                </Link>
              </li>

              <li className='nav-item ps-5'>
                <Link to="/admin/product" className="nav-link">
                  Create
                </Link>
              </li>
            </ul>
          </li>

          <li className='nav-item'>
            <Link to="/admin/orders" className="nav-link">
              <AiOutlineTablet/>
              <span className='px-3'>Orders</span>
            </Link>
          </li>

          <li className='nav-item'>
            <Link to="/admin/users" className="nav-link">
              <AiOutlineUser/>
              <span className='px-3'>Users</span>
            </Link>
          </li>
        </ul>

        <hr/>
      </div>
    </React.Fragment>
  )
}

export default SideBar