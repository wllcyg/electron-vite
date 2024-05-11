import { Card, Button, message, Space } from 'antd';
import { AxiosRequest } from '@/render/request';
import { fetchType } from '@/type';
import FromEl, { FormProps } from '@/render/components/FormEl';
import { useEffect } from 'react';

const Alioss = () => {
  const request = new AxiosRequest({});
  const component: FormProps[] = [
    { name: 'bucket', label: 'bucket名称', type: 'Input' },
    { name: 'region', label: '区域', type: 'Input' },
    { name: 'accessKeyId', label: 'AccessKey ID', type: 'Input' },
    { name: 'accessKeySecret', label: 'AccessKey Secret', type: 'Input' }
  ];
  const componentFetch: FormProps[] = [
    { name: 'fetchUrl', label: '请求地址', type: 'Input' },
    { name: 'Suffix', label: '图片后缀', type: 'Input' },
    { name: 'type', label: '图片类别', type: 'Select', options: [{ label: '动漫', value: 1 }] }
  ];
  const FinishEvent = async (values: any) => {
    const res = await window.OSS.clientOss(values);
    checkStatus();
  };
  const checkStatus = async () => {
    const res = await window.OSS.checkOssStatus();
    if (res && res.res.status === 200) {
      message.success('连接成功');
    } else {
      message.error('连接失败');
    }
  };
  let timer:number;
  let flage = false;
  const getImg = async (value: fetchType) => {
    if (flage) {
      const res = await window.OSS.getImage(value);
      if (res.code === 200) message.info(res.msg);
    }
  };
  const FinishEventGetImage = (value: fetchType) => {
    flage = true;
    getImg(value);
    timer = window.setInterval(() => {
      getImg(value);
    }, 10000);
  };
  const cancelHanle = () =>{
    flage = false;
  }
  useEffect(() =>{
   return () =>{
     timer && clearTimeout(timer);
   }
  })
  return (
    <div>
      <Card>
        <FromEl component={component} FinishEvent={FinishEvent} btnTxt={{ okTxt: '链接oss' }} />
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <FromEl component={componentFetch} overallArrange={{
          labelCol: { span: 6 }, wrapperCol: { span: 18 }
        }} FinishEvent={FinishEventGetImage}  btnTxt={{ okTxt: '开始获取'}} children={<Button onClick={() => cancelHanle()}>停止获取</Button>} />
      </Card>
    </div>
  );
};

export default Alioss;
