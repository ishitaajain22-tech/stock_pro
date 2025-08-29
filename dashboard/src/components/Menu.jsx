import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Menu = ({user}) => {
  const [selected, setSelected] = useState(0);
  const [profiledropdownopen, setProfileDropdownopen] = useState(false);

  const handleMenuClick = (index) => {
    setSelected(index);
  }

  const handleprofileClick = () => {
    setProfileDropdownopen(!profiledropdownopen);
  }

  const menuClass = 'menu';
  const activeMenuClass = 'menu selected';

  return (
    <div className="menu-container">
      <img src="/logo.png" alt="Logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => handleMenuClick(0)}
            >
              <p className={selected === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              style={{ textDecoration: "none" }}
              onClick={() => handleMenuClick(1)}
            >
              <p className={selected === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/holdings"
              style={{ textDecoration: "none" }}
              onClick={() => handleMenuClick(2)}
            >
              <p className={selected === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/positions"
              style={{ textDecoration: "none" }}
              onClick={() => handleMenuClick(3)}
            >
              <p className={selected === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/funds"
              style={{ textDecoration: "none" }}
              onClick={() => handleMenuClick(4)}
            >
              <p className={selected === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/apps"
              style={{ textDecoration: "none" }}
              onClick={() => handleMenuClick(5)}
            >
              <p className={selected === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleprofileClick}>
          <div className="avatar">{user.name[0]}</div>
          <p className="username">
            <strong>{user.name}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Menu