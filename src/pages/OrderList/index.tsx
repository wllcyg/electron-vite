import Search from '@/pages/OrderList/Search';
import dayjs from 'dayjs';
import { Drawer, Form, Input, Button, InputNumber, DatePicker, message, Select, Table } from 'antd';
import type { TableProps,PaginationProps } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelect, useHeight } from '@/render/hooks';
import { SaveInter, DataType } from '@/pages/type';
import { CategoryEnum } from '@/db/model/enum';
import OutOfOrder from '@/pages/OrderList/OutOfOrder';
interface AddCom {
  changeStatus: () => void,
  visible: boolean,
  title: string,
  setTitle?: (title: string) => void,
  isEdit: boolean,
  setIsEdit: (val: boolean) => void,
  searchform:object
}


const AddOrderOrEdit: React.FC<AddCom> = ({ visible, changeStatus, title, setTitle, isEdit, setIsEdit,searchform }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  /**
   * 弹窗逻辑
   * */
  const [modelOpen,setModelOpen] = useState(false)
  const [recordValue, setRecordValue] = useState(null);
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
      align: 'center',
      render: (_, { category }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const type = CategoryEnum[category];
        return (
          <div>
            {type}
          </div>);
      }
    },
    {
      title: '价格（￥）',
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
            <Button type="link" onClick={() => outOfHandle(record)}>出库</Button>
            <Button type="link" danger onClick={() => deleteItem(record)}>删除</Button>
          </div>);
      }
    }
  ];
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  const [optionsList] = useSelect();
  const [innerHeight] = useHeight(390);
  const [tableSource, setTableSource] = useState([]);
  const [pageOptions, setPageOptions] = useState({
    pageSize: 10,
    current: 1,
  });
  const [total, setTotal] = useState(0);
  const pageProps= {
    total,
    current:pageOptions.current,
    pageSize:pageOptions.pageSize,
  }
  const handleEdit = async (record: DataType) => {
    const res = await window.db.findOne({ id: record.id });
    const { code, data } = res;
    setId(record.id);
    if (code === 200) {
      resetForm();
      setTitle('编辑商品');
      setIsEdit(false);
      data.createdAt = dayjs(data.createdAt);
      form.setFieldsValue(data);
    }
  };
  const outOfHandle = (record: DataType) => {
    setRecordValue(record)
    setModelOpen(true)
  }
  const deleteItem = async (record: DataType) => {
    const res = await window.db.deleteItem({ id: record.id });
    console.log(res, 'resresresresresres');
    if (res.code === 200) {
      message.info(res.msg);
    }
    findList();
  };
  const saveValue = (type: string) => {
    form.validateFields().then(async (data) => {
      data.createdAt = dayjs().format('YYYY/MM/DD');
      if (type === 'update') data.id = id;
      const saveObj: SaveInter = {
        type: 'OrderList',
        data
      };
      let res;
      if (type === 'save') res = await window.db.saveValue(saveObj);
      if (type === 'update') res = await window.db.updateValue(saveObj);
      if (res.code === 200) {
        message.info(res.msg);
        resetForm();
        findList();
      }
    }).catch((err) => {
      console.log(err, 'this is err');
    });
  };
  const findList = async () => {
    const res = await window.db.findValue({ page: pageOptions.current, size: pageOptions.pageSize,params:searchform });
    const { code, data: { result, count } } = res;
    setTotal(count)
    if (code === 200) setTableSource(result);
  };
  const resetForm = () => {
    changeStatus();
    form.resetFields();
  };
  const tablePageChange =  (pagination: any) => {
    setPageOptions({ ...pagination });
  }
  useLayoutEffect(() => { // 可以在state设置后立即获取数据
    findList()
  },[pageOptions])
  useLayoutEffect(() => { //
    setPageOptions({...pageOptions,current: 1,pageSize:10})
    findList()
  },[searchform])
  useEffect(() => {
    findList();
  }, []);
  return (
    <div>
      <Table
             pagination={pageProps}
             bordered
             dataSource={tableSource}
             rowKey="id"
             columns={colums}
             scroll={{ y: innerHeight }}
             onChange={tablePageChange}
             className="mt-12" />
      <Drawer open={visible} title={title} width={450} onClose={() => resetForm()}>
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
          <Button onClick={resetForm}>取消</Button>
        </div>
      </Drawer>
      {
        modelOpen && <OutOfOrder open={modelOpen} setModelOpen={setModelOpen} rescord={recordValue} findList={findList}/>
      }
    </div>
  );
};

const OrderList = () => {
  const [visible, setBVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('新增商品');
  const [searchFormValue, setSearchFormValue] = useState(undefined);
  const changeStatus = () => {
    setBVisible(!visible);
  };
  const addItem = () => {
    setIsEdit(true);
    setTitle('新增商品');
    changeStatus();
  };
  const searchSubmit = (val: object) =>{
    setSearchFormValue(val)
  }

  return (
    <div>
      <Search addItem={addItem} search={searchSubmit} showAdd={true}/>
      <AddOrderOrEdit visible={visible} changeStatus={changeStatus} title={title} setTitle={setTitle} isEdit={isEdit}
                      setIsEdit={setIsEdit} searchform={searchFormValue} />
    </div>
  );
};

export default OrderList;
