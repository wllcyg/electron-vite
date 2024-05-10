import { Layout, Menu, theme, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { MainRoute } from '@/render/router';
const { Header, Content } = Layout;
import FloatMenu from '@/render/layout/FloatMenu';
import { useAppSelector } from '@/render/hooks/redux-type';
import { themeValue } from '@/render/store/theme/Slice';
import { SetStateAction, useEffect, useState } from 'react';
interface menuInt {
  key:string;
  label:string
}

const LayoutComponent = () => {
  const navigate = useNavigate();
  const [innerHeight, setInnerHeight] = useState(null);
  const menuItemClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const [menuItems, setMenuItems] = useState<menuInt[]>([]);
  const { themKey } = useAppSelector(themeValue);
  useEffect(() => {
    setInnerHeight(window.innerHeight - 90);
    if (MainRoute.children) {
      const menu:menuInt[] = []
      MainRoute.children.forEach(child =>{
        const {path,title } = child
        menu.push({
          key:path,
          label: title,
       });
      })
      setMenuItems(menu)
    }
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
            defaultSelectedKeys={['/home']}
            items={menuItems}
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
