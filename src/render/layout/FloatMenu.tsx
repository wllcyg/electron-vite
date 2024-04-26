import { FloatButton, Switch, theme } from 'antd';
import { useState } from 'react';
import { AppstoreAddOutlined, MoonOutlined, GithubOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/render/hooks/redux-type';
import { themeValue, setTheme } from '@/render/store/theme/Slice';

const FloatMenu = () => {
  const [open, setOpen] = useState(false);
  const { themKey } = useAppSelector(themeValue);
  const dispatch = useAppDispatch();
  const setThemeHandle = () => {
    if (themKey === 'darkAlgorithm'){
      dispatch(setTheme('lightAlgorithm'))
    }else {
      dispatch(setTheme('darkAlgorithm'))
    }
  };
  const openGit = () =>{
    window.system.openBrowser('https://github.com/wllcyg')
  }
  return (
    <div>
      <FloatButton.Group
        onClick={() => setOpen(!open)}
        open={open}
        trigger="click"
        style={{ right: 24 }}
        icon={<AppstoreAddOutlined />}
      >
        <FloatButton icon={<MoonOutlined />} onClick={() => setThemeHandle()} />
        <FloatButton icon={<GithubOutlined onClick={() => openGit()}/>} />
      </FloatButton.Group>
    </div>
  );
};

export default FloatMenu;
