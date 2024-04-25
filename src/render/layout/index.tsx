import React from 'react';
import {  Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Content } = Layout;
import { FloatButton } from "antd";
const items = [
  {key:'/', label:'首页'},
  {key:'/order', label:'库存列表'},
  {key:'/sells', label:'出库列表'},
  {key:'/rtk', label:'redux-tools'},

]

const LayoutComponent = () => {
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const menuItemClick : MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onClick={menuItemClick}
        />

      </Header>
      <Content >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </div>
      </Content>
    </Layout>
  );
};

export default LayoutComponent;
