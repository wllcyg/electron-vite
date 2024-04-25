import { FloatButton,Switch } from "antd";
import { useState } from 'react'
import { CommentOutlined, AppstoreAddOutlined } from '@ant-design/icons';
const FloatMenu = () => {
  const [open, setOpen] = useState(false);

  const onChange = (checked: boolean) => {
    setOpen(checked);
  };

  return (
    <div>
      <FloatButton.Group
        onClick={() => setOpen(!open)}
        open={open}
        trigger="click"
        style={{ right: 24 }}
        icon={<AppstoreAddOutlined />}
      >
        <FloatButton  />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </div>
  );
};

export default FloatMenu;
