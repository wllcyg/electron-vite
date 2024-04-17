import { Card, Form, Input, Button, DatePicker } from 'antd'
import { SearchListWrapper } from '@/pages/OrderList/style';
import React from 'react';
interface ComProps {
  addItem: () => void;
  search:(val:object) => void;
}
const Search: React.FC<ComProps> = (props) => {
  const [form] = Form.useForm()
  const addOrder = () => {
    props.addItem()
  }
  const handleSearch = ()=>{
    props.search(form.getFieldsValue())
  }
  return (
    <SearchListWrapper>
      <Card >
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
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="规格"
            name="specification"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="入库时间"
            name="createdAt"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <DatePicker size='middle' />
          </Form.Item>
        </Form>
        <div className='search-list'>
          <Button type='primary' onClick={handleSearch}>查询</Button>
          <Button>重置</Button>
          <Button onClick={() => addOrder()}>新增</Button>
        </div>
      </Card>
    </SearchListWrapper>
  );
};

export default Search;
