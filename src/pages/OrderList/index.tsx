import Search from '@/pages/OrderList/Search';
import dayjs from 'dayjs';
import { Drawer, Form, Input, Button, InputNumber, DatePicker, message, Select, Table } from 'antd';
import type { TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelect, useHeight } from '@/render/hooks';
import { SaveInter, DataType } from '@/pages/type';

interface AddCom {
  changeStatus: () => void,
  visible: boolean,
  title: string,
  setTitle?: (title: string) => void,
  isEdit: boolean,
  setIsEdit: (val: boolean) => void
}


const AddOrderOrEdit: React.FC<AddCom> = ({ visible, changeStatus, title, setTitle, isEdit, setIsEdit }) => {
  const colums: TableProps<DataType>['columns'] = [
    {
      title: '名称',
      dataIndex: 'ordername',
      key: 'ordername',
      align: 'center'
    },
    {
      title: '规格',
      dataIndex: 'specification',
      key: 'specification',
      align: 'center'
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      align: 'center'
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center'
    },
    {
      title: '数量',
      dataIndex: 'count',
      key: 'count',
      align: 'center'
    },
    {
      title: '入库时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center'
    },
    {
      title: '操作',
      align: 'center',
      width: '230px',
      render: (_, record) => {
        return (
          <div>
            <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
            <Button type="link">出库</Button>
            <Button type="link" danger>删除</Button>
          </div>);
      }
    }
  ];
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm();
  const [optionsList] = useSelect();
  const [innerHeight] = useHeight(390);
  const [tableSource, setTableSource] = useState([]);
  const handleEdit = async (record: DataType) => {
    const res = await window.db.findOne({ id: record.id });
    const { code, data } = res;
    if (code === 200) {
      changeStatus();
      setTitle('编辑页面');
      setIsEdit(false)
      data.createdAt = dayjs(data.createdAt);
      form.setFieldsValue(data);
    }
  };

  const saveValue = (type:string) => {
    form.validateFields().then(async (data) => {
      data.createdAt = dayjs().format('YYYY/MM/DD');
      const saveObj: SaveInter = {
        type: 'OrderList',
        data
      };
      let res;
      if (type === 'save') res = await window.db.saveValue(saveObj);
      if (type === 'update') res = await window.db.updateValue(saveObj);
      if (res.code === 200) {
        message.info(res.msg);
        changeStatus();
        findList();
      }
    }).catch((err) => {
      console.log(err, 'this is err');
    });
  };
  const findList = async () => {
    const res = await window.db.findValue({ page: 1, size: 10 });
    const { code, data: { result, count } } = res;
    if (code === 200) setTableSource(result);
  };
  useEffect(() => {
    findList();
  }, []);

  return (
    <div>
      <Table bordered dataSource={tableSource} rowKey="id" columns={colums} scroll={{ y: innerHeight }}
             className="mt-12" />
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
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item
            label="规格"
            name="specification"
            rules={[{ required: true, message: '请输入规格' }]}
          >
            <Input placeholder="请输入规格" />
          </Form.Item>
          <Form.Item
            label="类别"
            name="category"
            rules={[{ required: true, message: '请选择类别' }]}
          >
            <Select placeholder="请选择类别">
              {
                optionsList.map(item => (<Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="价格"
            name="price"
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="请输入价格" min={0} />
          </Form.Item>
          <Form.Item
            label="商品数量"
            name="count"
            rules={[{ required: true, message: '请输入商品数量' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="请输入商品数量" min={0} />
          </Form.Item>
          <Form.Item
            label="入库时间"
            name="createdAt"
            rules={[{ required: true, message: '请选择入库时间' }]}
          >
            <DatePicker format={dateFormat} placeholder="请选择入库时间" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
        <div className="submit-btn">
          {
            isEdit ? <Button type="primary" onClick={() => saveValue('save')}>保存</Button> :
              <Button type="primary" onClick={() => saveValue('update')}>更新</Button>
          }
          <Button onClick={changeStatus}>取消</Button>
        </div>
      </Drawer>
    </div>
  );
};

const OrderList = () => {
  const [visible, setBVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('新增商品');
  const changeStatus = () => {
    setBVisible(!visible);
  };
  const addItem = () => {
    setIsEdit(true);
    setTitle('新增商品')
    changeStatus();
  };
  return (
    <div>
      <Search addItem={addItem} />
      <AddOrderOrEdit visible={visible} changeStatus={changeStatus} title={title} setTitle={setTitle} isEdit={isEdit}
                      setIsEdit={setIsEdit} />
    </div>
  );
};

export default OrderList;
