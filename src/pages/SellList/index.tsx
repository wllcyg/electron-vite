import Search from '@/pages/OrderList/Search';
import { Button, Table, type TableProps } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { DataType } from '@/pages/type';
import { CategoryEnum } from '@/db/model/enum';
import { useHeight } from '@/render/hooks';

const SellsList = () => {
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
      title: '售价（￥）',
      dataIndex: 'sell',
      key: 'sell',
      align: 'center'
    },
    {
      title: '利润（￥）',
      dataIndex: 'profit',
      key: 'profit',
      align: 'center'
    },
    {
      title: '出库量',
      dataIndex: 'outOfWare',
      key: 'outOfWare',
      align: 'center'
    },
    {
      title: '出库时间',
      dataIndex: 'outOfWareDate',
      key: 'outOfWareDate',
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      align: 'center'
    }
  ];
  const [innerHeight] = useHeight(390);
  const [pageOptions, setPageOptions] = useState({
    pageSize: 10,
    current: 1
  });
  const [tableSource, setTableSource] = useState([]);
  const [total, setTotal] = useState(0);
  const pageProps = {
    total,
    current: pageOptions.current,
    pageSize: pageOptions.pageSize
  };
  const [searchForm, setSearchForm] = useState(undefined);
  const tablePageChange = (pagination: any) => {
    setPageOptions({ ...pagination });
  };
  const findList = async () => {
    const res = await window.db.findValue({type:'OrderLog', page: pageOptions.current, size: pageOptions.pageSize,params:searchForm });
    const { code, data: { result, count } } = res;
    setTotal(count);
    if (code === 200) setTableSource(result);
  };
  const searchSubmit = (val: object) =>{
    setSearchForm(val)
  }
  useLayoutEffect(() => { // 可以在state设置后立即获取数据
    findList();
  }, [pageOptions]);
  useLayoutEffect(() => { //
    setPageOptions({...pageOptions,current: 1,pageSize:10})
    findList()
  },[searchForm])
  useEffect(() => {
    findList();
  }, []);
  return (
    <div>
      <Search showAdd={false} search={searchSubmit}/>
      <Table
        pagination={pageProps}
        bordered
        dataSource={tableSource}
        rowKey="id"
        columns={colums}
        scroll={{ y: innerHeight }}
        onChange={tablePageChange}
        className="mt-12" />
    </div>
  );
};

export default SellsList;
