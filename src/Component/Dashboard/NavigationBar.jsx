import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { taplink } from './NaveLink';
import { WindowSize } from '../Context/WindowContext';
import './NavigationBar.css';
import {
  Menu as MenuIcon,
  ExpandMore,
  ExpandLess,
  PersonAdd,
  People,
  Assessment,
  DirectionsCar,
  LocalGasStation,
  Search,
  Group,
  Star,
  Settings,
  Close
} from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

export default function NavigationBar() {
  const windowContext = useContext(WindowSize);
  const windowSize = windowContext.windowSize;
  const location = useLocation();
  
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [anchorEls, setAnchorEls] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getIconForItem = (title) => {
    if (title.includes('المشرفين') || title.includes('موظف')) return <People />;
    if (title.includes('مركبة')) return <DirectionsCar />;
    if (title.includes('وقود')) return <LocalGasStation />;
    if (title.includes('إضافة')) return <PersonAdd />;
    if (title.includes('بيانات') || title.includes('استعلام')) return <Assessment />;
    if (title.includes('عميل') || title.includes('العملاء')) return <Group />;
    if (title.includes('جوائز') || title.includes('مكافآت')) return <Star />;
    if (title.includes('إعدادات') || title.includes('صلاحيات')) return <Settings />;
    return null;
  };

  const handleMenuClick = (event, index) => {
    if (windowSize > 768) {
      // Desktop: Toggle dropdown
      setOpenDropdowns(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    } else {
      // Mobile: Use MUI Menu
      setAnchorEls(prev => ({
        ...prev,
        [index]: event.currentTarget
      }));
    }
  };

  const handleMenuClose = (index) => {
    if (windowSize > 768) {
      setOpenDropdowns(prev => ({
        ...prev,
        [index]: false
      }));
    } else {
      setAnchorEls(prev => ({
        ...prev,
        [index]: null
      }));
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname.includes(`/${path}`);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (windowSize > 768) {
        Object.keys(openDropdowns).forEach(key => {
          if (openDropdowns[key]) {
            const dropdown = document.getElementById(`dropdown-${key}`);
            if (dropdown && !dropdown.contains(event.target)) {
              setOpenDropdowns(prev => ({
                ...prev,
                [key]: false
              }));
            }
          }
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdowns, windowSize]);

  return (
    <>
      <nav className="modern-navigation">
        <div className="nav-container">
          {/* Desktop Navigation */}
          {windowSize > 768 ? (
            <div className="nav-desktop">
              {taplink.map((item, index) => (
                <div 
                  key={index} 
                  className="nav-item-wrapper"
                  id={`dropdown-${index}`}
                >
                  {item.subtitle && item.subtitle.length > 0 ? (
                    <>
                      <button
                        className={`nav-main-item ${openDropdowns[index] ? 'active' : ''}`}
                        onClick={(e) => handleMenuClick(e, index)}
                      >
                        <span className="nav-icon">{getIconForItem(item.maintitle)}</span>
                        <span className="nav-text">{item.maintitle}</span>
                        {openDropdowns[index] ? <ExpandLess /> : <ExpandMore />}
                      </button>
                      {openDropdowns[index] && (
                        <div className="nav-dropdown">
                          {item.subtitle.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={`/dashboard/${subItem.link}`}
                              className={`nav-dropdown-item ${isActiveRoute(subItem.link) ? 'active' : ''}`}
                              onClick={() => handleMenuClose(index)}
                            >
                              <span className="nav-icon-small">{getIconForItem(subItem.title)}</span>
                              <span>{subItem.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.link || '/dashboard'}
                      className={`nav-main-item ${isActiveRoute(item.link) ? 'active' : ''}`}
                    >
                      <span className="nav-icon">{getIconForItem(item.maintitle)}</span>
                      <span className="nav-text">{item.maintitle}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Mobile Navigation
            <>
              <button className="mobile-menu-button" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <Close /> : <MenuIcon />}
              </button>
              {mobileMenuOpen && (
                <div className="nav-mobile-overlay" onClick={toggleMobileMenu}>
                  <div className="nav-mobile-menu" onClick={(e) => e.stopPropagation()}>
                    <div className="mobile-menu-header">
                      <h3>القائمة</h3>
                      <button onClick={toggleMobileMenu}><Close /></button>
                    </div>
                    <div className="mobile-menu-content">
                      {taplink.map((item, index) => (
                        <div key={index} style={{ position: 'relative', zIndex: 2000 }}>
                          {item.subtitle && item.subtitle.length > 0 ? (
                            <>
                              <button
                                className={`mobile-menu-item ${openDropdowns[index] ? 'expanded' : ''}`}
                                onClick={() => setOpenDropdowns(prev => ({
                                  ...prev,
                                  [index]: !prev[index]
                                }))}
                                style={{ position: 'relative', zIndex: 2001 }}
                              >
                                <span className="mobile-menu-icon">{getIconForItem(item.maintitle)}</span>
                                <span>{item.maintitle}</span>
                                {openDropdowns[index] ? <ExpandLess /> : <ExpandMore />}
                              </button>
                              {openDropdowns[index] && (
                                <div
                                  className="mobile-submenu"
                                  style={{ position: 'relative', zIndex: 2002, background: '#fff' }}
                                >
                                  {item.subtitle.map((subItem, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      to={`/dashboard/${subItem.link}`}
                                      className={`mobile-submenu-item ${isActiveRoute(subItem.link) ? 'active' : ''}`}
                                      onClick={toggleMobileMenu}
                                      style={{ zIndex: 2003 }}
                                    >
                                      {subItem.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              to={item.link || '/dashboard'}
                              className={`mobile-menu-item ${isActiveRoute(item.link) ? 'active' : ''}`}
                              onClick={toggleMobileMenu}
                              style={{ position: 'relative', zIndex: 2001 }}
                            >
                              <span className="mobile-menu-icon">{getIconForItem(item.maintitle)}</span>
                              <span>{item.maintitle}</span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </>
  );
}
