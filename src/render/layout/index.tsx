import { Layout, Menu, theme, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
import FloatMenu from '@/render/layout/FloatMenu';
import { useAppSelector } from '@/render/hooks/redux-type';
import { themeValue } from '@/render/store/theme/Slice';
import { useEffect, useState } from 'react';

const items = [
  { key: '/', label: '首页' },
  { key: '/order', label: '库存列表' },
  { key: '/sells', label: '出库列表' },
  { key: '/rtk', label: 'redux-tools' }
];

const LayoutComponent = () => {
  const navigate = useNavigate();
  const [innerHeight, setInnerHeight] = useState(null);
  const menuItemClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };
  const {themKey} = useAppSelector(themeValue);
  useEffect(() =>{
    setInnerHeight(window.innerHeight - 90)
  },[])
  return (
    <ConfigProvider theme={{
      algorithm:themKey === 'darkAlgorithm' ? theme.darkAlgorithm : theme.defaultAlgorithm
    }}>
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            background: 'transparent',
            padding: 0
          }}
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['/']}
            items={items}
            style={{ minWidth: 0, width: '100%' }}
            onClick={menuItemClick}
          />

        </Header>
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: innerHeight
            }}
          >
            <Outlet />
          </div>
        </Content>
        <FloatMenu />
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutComponent;
