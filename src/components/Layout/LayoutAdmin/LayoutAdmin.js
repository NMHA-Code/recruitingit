import React, { useState, useMemo } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CloudOutlined,
  UnorderedListOutlined,
  SnippetsOutlined,
  LogoutOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Button, Drawer, Grid, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { deleteCookie, getCookie } from '../../../helpers/Cookie/Cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../../action';
import '../../../constants/Style/Admin.scss';

const { Header, Sider, Content } = Layout;

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  const cookie = getCookie('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Map route base -> menu key
  const pathKeyMap = {
    '/admin': '1',
    '/info-company': '2',
    '/job-manage': '3',
    '/cv-manage': '4'
  };

  // Nếu route là '/admin/something' vẫn tìm đúng key bằng startsWith
  const currentKey = useMemo(() => {
    const pathname = location.pathname || '/admin';
    for (const [path, key] of Object.entries(pathKeyMap)) {
      if (pathname === path || pathname.startsWith(`${path}/`)) {
        return key;
      }
    }
    return '1';
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (err) {
      console.error('Error dispatching logout action:', err);
    }
    ['id', 'companyName', 'email', 'token'].forEach(deleteCookie);
    navigate('/home', { replace: true });
  };

  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const toggleMenu = () => {
    if (isMobile) {
      setDrawerVisible(true);
    } else {
      setCollapsed(prev => !prev);
    }
  };

  const onMenuClickMobile = () => {
    setDrawerVisible(false);
  };

  const menuItems = [
    { key: '1', icon: <CloudOutlined />,       label: <NavLink to="/admin"      onClick={onMenuClickMobile}>Tổng quan</NavLink> },
    { key: '2', icon: <UserOutlined />,        label: <NavLink to="/info-company" onClick={onMenuClickMobile}>Thông tin công ty</NavLink> },
    { key: '3', icon: <UnorderedListOutlined />, label: <NavLink to="/job-manage"   onClick={onMenuClickMobile}>Quản lý việc làm</NavLink> },
    { key: '4', icon: <SnippetsOutlined />,    label: <NavLink to="/cv-manage"     onClick={onMenuClickMobile}>Quản lý CV</NavLink> },
  ];

  return (
    <Layout>
      {isMobile ? (
        <Drawer
          open={drawerVisible}
          placement="left"
          onClose={() => setDrawerVisible(false)}
          maskClosable
          closable={false}
          width={200}
        >
          <h1 className="demo-logo-vertical">{collapsed ? 'IT' : 'IT Admin'}</h1>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[currentKey]}
            items={menuItems}
          />
        </Drawer>
      ) : (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="md"
          collapsedWidth={0}
          onBreakpoint={broken => setCollapsed(broken)}
          style={{ background: '#fff' }}
        >
          <h1 className="demo-logo-vertical">{collapsed ? 'IT' : 'IT Admin'}</h1>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[currentKey]}
            items={menuItems}
          />
        </Sider>
      )}

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleMenu}
              style={{ fontSize: 16, width: 64, height: 64 }}
            />
          </div>

          <div className="header__navlink" style={{ display: 'flex', gap: 12, alignItems: 'center', paddingRight: 16 }}>
            {cookie ? (
              <>
                <NavLink to="/home" className="navlink">
                  <HomeOutlined />
                  <span className="nav-text">Trang chủ</span>
                </NavLink>

                <button type="button" onClick={handleLogout} className="navlink">
                  <LogoutOutlined />
                  <span className="nav-text">Đăng xuất</span>
                </button>
              </>
            ) : null}
          </div>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutAdmin;
