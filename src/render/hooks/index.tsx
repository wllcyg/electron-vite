import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';
export function useMsg(){
  const [messageApi, contextHolder] = message.useMessage();
  const open = (type:NoticeType,content:string) => {
    messageApi.open({
      type,
      content
    });
  }
  return [open]
}