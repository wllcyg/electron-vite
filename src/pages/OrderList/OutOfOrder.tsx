import { Modal } from 'antd'
import React from 'react';
interface OutOrderInterFace {
  open: boolean;
  setModelOpen: (open: boolean) => void;
}
const OutOfOrder:React.FC<OutOrderInterFace> = ({open,setModelOpen}) => {
  return (
    <div>
      <Modal title='出库商品' open={open} onCancel={() => setModelOpen(false)}>

      </Modal>
    </div>
  );
};

export default OutOfOrder;
