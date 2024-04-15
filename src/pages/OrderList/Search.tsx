import { Card, Form, Input, Button } from 'antd'
import { SearchListWrapper } from '@/pages/OrderList/style';
import React from 'react';
interface ComProps {
  addItem: () => void;
}
const Search: React.FC<ComProps> = (props) => {
  const addOrder = () => {
    props.addItem()
  }
  return (
    <SearchListWrapper>
      <Card >
        <Form
          name="basic"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          layout="inline"
        >
          <Form.Item
            label="商品名称"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品规格"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="入库时间"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
        <div className='search-list'>
          <Button type='primary'>查询</Button>
          <Button>重置</Button>
          <Button onClick={() => addOrder()}>新增</Button>
        </div>
      </Card>
    </SearchListWrapper>
  );
};

export default Search;
