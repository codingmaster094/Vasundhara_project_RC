import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom'
import Logo from '../Component/Logo';
import LogoMini from '../Component/Logo-mini';

const Sidebar = ({ sidebar }) => {

    const [classActive, setClassActive] = useState({
        drp1: false,
        drp2: false,
        drp3: false,
        drp4: false,
        drp5: false,
    });

    const handleActiveClass = (name) => {
        let data = {
          drp1: false,
          drp2: false,
          drp3: false,
          drp4: false,
          drp5: false,
        }
        data[name] = classActive[name] === true ? false : true
        setClassActive(data)
    };

    return (
        <>
            <div className={sidebar ? "sidebar-wrapper active" : "sidebar-wrapper"}>
                <div className="sidebar-header">
                    <div className="d-flex justify-content-between">
                        <div className='sidebar-logo'>
                            <Link to="/Home">
                                <Logo />
                                <LogoMini />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">
                        <li className="sidebar-item">
                            <NavLink to="/Home" className='sidebar-link'>
                                <i className='bx bxs-home'></i>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item has-sub">
                            <div onClick={() => { handleActiveClass("drp1") }} className="sidebar-link">
                            <i class='bx bxs-credit-card'></i>
                                <span>RC Information</span>
                            </div>
                            <ul className={`${"submenu"} ${classActive.drp1 ? "active" : "inactive"}`} >
                                <li className="submenu-item">
                                    <NavLink to="/DL_RC_info">
                                        <span>DL/RC Info</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/Traffic_state">
                                        <span>Traffic State</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/Traffic_rule">
                                        <span>Traffic Rule</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item has-sub">
                            <div onClick={() => { handleActiveClass("drp2") }} className="sidebar-link">
                            <i class='bx bxs-news' ></i>
                                <span>News</span>
                            </div>
                            <ul className={`${"submenu"} ${classActive.drp2 ? "active" : "inactive"}`} >
                                <li className="submenu-item">
                                    <NavLink to="/news_category">
                                        <span>News Category</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/news_Headline">
                                        <span>News Headline</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/news">
                                        <span>News</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/tag">
                                        <span>Tag</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item has-sub">
                            <div onClick={() => { handleActiveClass("drp3") }} className="sidebar-link">
                            <i class='bx bxs-car' ></i>
                                <span>Driving School</span>
                            </div>
                            <ul className={`${"submenu"} ${classActive.drp3 ? "active" : "inactive"}`} >
                                <li className="submenu-item">
                                    <NavLink to="/driving">
                                        <span>Driving School State</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/driving_city">
                                        <span>Driving School City</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/driving_Area">
                                        <span>Driving School Area</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/driving_Detail">
                                        <span>Driving School Details</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item has-sub">
                            <div onClick={() => { handleActiveClass("drp4") }} className="sidebar-link">
                                <i class='bx bxs-chalkboard'></i>
                                <span>Service Center</span>
                            </div>
                            <ul className={`${"submenu"} ${classActive.drp4 ? "active" : "inactive"}`} >
                                <li className="submenu-item">
                                    <NavLink to="/service_state">
                                        <span>State</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/service_city">
                                        <span>City</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/service_brand">
                                        <span>Brand</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/service_center">
                                        <span>Service Center</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/service_Dealer">
                                        <span>Service Dealer</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item has-sub">
                            <div onClick={() => { handleActiveClass("drp5") }} className="sidebar-link">
                            <i class='bx bxs-car' ></i>
                                <span>Vehicle Info 2.0</span>
                            </div>
                            <ul className={`${"submenu"} ${classActive.drp5 ? "active" : "inactive"}`} >
                                <li className="submenu-item">
                                    <NavLink to="/Vehicale_Categoty">
                                        <span>Category</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/Vehicale_Brand">
                                        <span>brand</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/Vehicale_information">
                                        <span>Vehicle Information</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/Vehicale_body_type">
                                        <span>Body Type</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/Key_Specification">
                                        <span>Key Specification</span>
                                    </NavLink>
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/Variant_specification">
                                        <span>Veriant Specification</span>
                                    </NavLink> 
                                </li>
                                <li className="submenu-item">
                                    <NavLink to="/service_Dealer">
                                        <span>Compares</span>
                                    </NavLink> 
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item">
                            <NavLink to="/fuel/price" className='sidebar-link '>
                                <i className='bx bxs-home'></i>
                                <span>Fuel Price</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar