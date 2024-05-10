import { WindowContainer } from '@/pages/window/style';
import { Button } from 'antd';
const WindowCom = () => {
  const showWindow = () => {
    console.log(2);
    window.system.showChild()
  }
  return (
    <WindowContainer>
      <div className="options-button">
        <Button type='primary' onClick={() => showWindow()}>新建窗口</Button>
        <Button type='dashed'>关闭窗口</Button>

      </div>

    </WindowContainer>
  );
};

export default WindowCom;
