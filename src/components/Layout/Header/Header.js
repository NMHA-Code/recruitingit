// Headers.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { deleteCookie, getCookie } from '../../../helpers/Cookie/Cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../../action';
import { PrivateRouters } from '../../PrivateRouter/privaterouter';

function Headers(){
  const checkCookie = getCookie('token'); // nếu có token => đã login 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (err) {
      console.error('Error dispatching logout action:', err);
    }
deleteCookie('id');
    deleteCookie('companyName');
    deleteCookie('email');
    deleteCookie('token');
    navigate('/home', { replace: true });
  };

  return (
    <div className='header'>
      <h1>IT Jobs</h1>

      <div className='header__navlink'>
        {checkCookie ? (
          <>
            <NavLink to={'/admin'} className='navlink'>
              <UserOutlined />
              <span className='nav-text'>Quản lí</span>
            </NavLink>

            <NavLink onClick={handleLogout} className='navlink'>
              <LogoutOutlined />
              <span className='nav-text'>Đăng xuất</span>
            </NavLink>
          </>
        ) : (
          // chưa login -> show đăng nhập / đăng kí
          <>
            <NavLink to={'/login'} className='navlink'>
              <span className='nav-text'>Đăng nhập</span>
            </NavLink>

            <NavLink to={'/register'} className='navlink'>
              <span className='nav-text'>Đăng kí</span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Headers;
