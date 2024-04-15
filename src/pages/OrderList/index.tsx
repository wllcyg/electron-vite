import Search from '@/pages/OrderList/Search';
import dayjs from 'dayjs';
import { Drawer, Form, Input, Button, InputNumber, DatePicker } from 'antd';
import React, { useState } from 'react';
import { SaveInter } from '@/pages/type';
import { useMsg } from '@/render/hooks';
interface AddCom {
  changeStatus: () => void;
  visible: boolean,
  title: string
}

const AddOrderOrEdit: React.FC<AddCom> = ({ visible, changeStatus, title }) => {
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm()
  const [open] = useMsg()
  const saveValue = () => {
    form.validateFields().then(async (data) => {
      data.createdAt = dayjs().format('YYYY/MM/DD');
      const saveObj:SaveInter = {
        type:'OrderList',
        data
      }
      const res = await window.db.saveValue(saveObj)
      console.log(res,'this is resvalie');
      open(
        'success',
        res.msg,
      )
    }).catch((err) => {
      console.log(err,'this is err');
    })
  }
  return (
    <div>
      <Drawer open={visible} title={title} width={450} onClose={() => changeStatus()}>
        <Form
              form={form}
              name="order"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}>
          <Form.Item
            label="商品名称"
            name="ordername"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder='请输入商品名称' />
          </Form.Item>
          <Form.Item
            label="规格"
            name="specification"
            rules={[{ required: true, message: '请输入规格' }]}
          >
            <Input placeholder='请输入规格' />
          </Form.Item>
          <Form.Item
            label="类别"
            name="category"
            rules={[{ required: true, message: '请选择类别' }]}
          >
            <Input placeholder='请选择类别' />
          </Form.Item>
          <Form.Item
            label="价格"
            name="price"
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <InputNumber style={{width:'100%'}}  placeholder='请输入价格' min={0}/>
          </Form.Item>
          <Form.Item
            label="商品数量"
            name="count"
            rules={[{ required: true, message: '请输入商品数量' }]}
          >
            <InputNumber style={{width:'100%'}} placeholder='请输入商品数量' min={0}/>
          </Form.Item>
          <Form.Item
            label="入库时间"
            name="createdAt"
            rules={[{ required: true, message: '请选择入库时间' }]}
          >
            <DatePicker format={dateFormat} placeholder='请选择入库时间' style={{width:'100%'}}/>
          </Form.Item>
        </Form>
        <div className="submit-btn">
          <Button type='primary' onClick={() => saveValue()}>保存</Button>
          <Button onClick={changeStatus}>取消</Button>
        </div>
      </Drawer>
    </div>
  );
};

const OrderList = () => {
  const [visible, setBVisible] = useState(true);
  const [title, setTitle] = useState('新增商品');
  const changeStatus = () => {
    setBVisible(!visible);
  };
  const addItem = () => {
    changeStatus();
  };
  return (
    <div>
      <Search addItem={addItem} />
      <AddOrderOrEdit visible={visible} changeStatus={changeStatus} title={title} />
    </div>
  );
};

export default OrderList;
