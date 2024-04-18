import { Modal, Form, Input, InputNumber, message, DatePicker } from 'antd';
import React, { useState } from 'react';
import { DataType } from '@/pages/type';
import dayjs from 'dayjs';
import calcnumber from 'calc-number'
interface OutOrderInterFace {
  open: boolean;
  setModelOpen: (open: boolean) => void;
  rescord: DataType;
  findList: () => void;
}

const OutOfOrder: React.FC<OutOrderInterFace> = ({ open, setModelOpen, rescord, findList }) => {
  const [count, setCount] = useState(0);
  const [form] = Form.useForm();
  const handleSSubmit = async () => {
    form.validateFields().then(async data => {
      // 保存原始值,生成新的历史记录
      rescord.count = rescord.count - data.outOfWare;
      console.log(rescord,'rescordrescordrescord');
      const saveObj = {
        type: 'OrderList',
        data: rescord
      };
      const res = await window.db.updateValue(saveObj);
      if (res.code === 200) {
        const { ordername, specification, category } = rescord;
        const tempObj = { ...data };
        tempObj.outOfWareDate = dayjs(tempObj.outOfWareDate).format('YYYY/MM/DD');
        tempObj.ordername = ordername;
        tempObj.specification = specification;
        tempObj.category = category;
        // tempObj.imgUrl = '';
        tempObj.profit = calcnumber(`${data.sell}-${rescord.price}`);
        const LogList = {
          type: 'OrderLog',
          data: {
            ...tempObj
          }
        };
        const logres = await window.db.saveValue(LogList);
        if (logres.code === 200){
          setModelOpen(false)
          findList()
          message.info(logres.msg)
        }
      } else {
        message.error(res.msg);
      }
    });

  };
  return (
    <div>
      <Modal title="出库商品" open={open} onCancel={() => setModelOpen(false)} onOk={handleSSubmit}>
        <Form
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}>
          <Form.Item label="商品名称">
            <Input value={rescord.ordername} disabled />
          </Form.Item>
          <Form.Item label="售价" name="sell" rules={[{ required: true, message: '请输入商品售价' }]}>
            <InputNumber style={{ width: '100%' }} placeholder="请输入商品售价" />
          </Form.Item>
          <Form.Item label="出库数量" name="outOfWare" rules={[{ required: true, message: '请输入出库数量' }]}>
            <InputNumber style={{ width: '100%' }} placeholder="请输入出库数量" max={rescord.count} min={0} />
          </Form.Item>
          <Form.Item label="出库时间" name="outOfWareDate" rules={[{ required: true, message: '请选择出库时间' }]}>
            <DatePicker style={{ width: '100%' }} placeholder="请选择出库时间" />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea style={{ width: '100%' }} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OutOfOrder;
