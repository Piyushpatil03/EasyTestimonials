import "./Layout.css";
import { Link, Outlet } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import { FiHome, FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { BsGrid1X2 } from "react-icons/bs";
import { TbMinimize } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";
import { TfiThought } from "react-icons/tfi";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="div_container">
      <Sidebar className="sidebar" collapsed={collapsed} collapsedWidth="70px">
        <div className="head_div">
          {collapsed && <TfiThought size={26} color="red" className="emoji_start" style={{ cursor: "pointer" }} />}
          {!collapsed && (
            <>
              <h3 className="head">Testimonials</h3>
              <TbMinimize
                size={22}
                className="minimize"
                onClick={() => setCollapsed(!collapsed)}
              />
            </>
          )}
        </div>

        <Menu>
          <Link to="/" className="link">
            <MenuItem icon={<FiHome size={20} className="emoji" />}>
              <span className="navList">Home</span>
            </MenuItem>
          </Link>

          <Link to="/testimonials" className="link">
            <MenuItem icon={<FaRegHeart size={20} className="emoji" />}>
              <span className="navList">Testimonials</span>
            </MenuItem>
          </Link>
          <Link to="/layouts" className="link">
            <MenuItem icon={<BsGrid1X2 size={18} className="emoji" />}>
              <span className="navList">Layout Designs</span>
            </MenuItem>
          </Link>

          <Link to="/profile" className="link">
            <MenuItem icon={<FiUser size={20} className="emoji" />}>
              <span className="navList">Profile</span>
            </MenuItem>
          </Link>
        </Menu>

        {collapsed && (
          <FaArrowRight
            size={20}
            className="emoji_end"
            onClick={() => setCollapsed(!collapsed)}
            style={{ cursor: "pointer" }}
          />
        )}
      </Sidebar>

      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
