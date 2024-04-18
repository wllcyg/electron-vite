import { Card, Form, Input, Button, DatePicker } from 'antd';
import { SearchListWrapper } from '@/pages/OrderList/style';
import React from 'react';
import dayjs from 'dayjs';

interface ComProps {
  addItem?: () => void;
  search?: (val: object) => void;
  showAdd?: boolean;
}

const Search: React.FC<ComProps> = (props) => {
  const [form] = Form.useForm();
  const addOrder = () => {
    props.addItem();
  };
  const handleSearch = () => {
    const obj = form.getFieldsValue();
    if (obj.createdAt) {
      obj.createdAt = dayjs(obj.createdAt).format('YYYY/MM/DD');
    }
    if (obj.outOfWareDate) {
      obj.outOfWareDate = dayjs(obj.outOfWareDate).format('YYYY/MM/DD');
    }
    props.search(obj);
  };
  const reset = () => {
    form.resetFields();
    props.search({});
  };
  return (
    <SearchListWrapper>
      <Card>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          layout="inline"
        >
          <Form.Item
            label="名称"
            name="ordername"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="规格"
            name="specification"
          >
            <Input />
          </Form.Item>
          {
            props.showAdd &&
            <Form.Item
              label="入库时间"
              name="createdAt"
            >
              <DatePicker size="middle" />
            </Form.Item>
          }
          {
            !props.showAdd &&
            <Form.Item
              label="出库时间"
              name="outOfWareDate"
            >
              <DatePicker size="middle" />
            </Form.Item>
          }
        </Form>
        <div className="search-list">
          <Button type="primary" onClick={handleSearch}>查询</Button>
          <Button onClick={reset}>重置</Button>
          {props.showAdd && <Button onClick={() => addOrder()}>新增</Button>}
        </div>
      </Card>
    </SearchListWrapper>
  )
    ;
};

export default Search;
