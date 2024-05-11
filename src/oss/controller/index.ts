import { ipcMain } from 'electron';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require('uuid');
import { fetchType } from '@/type';
import OssSingleton from '..';
import axios from 'axios';
import dbConfig from '@/db/server';
// 在这里处理图片下载逻辑
export default function OSS() {
  const instance = OssSingleton.getInstance();
  ipcMain.handle('Client-OSS', (_, value) => {
    if (value) {
      instance.initClient(value);
    }
    return '';
  });
  ipcMain.handle('Check-OSS-Status', async (_, value) => {
    return await instance.listBuckets();
  });
  ipcMain.handle('Get-Image', async (_, { Suffix, fetchUrl, type }: fetchType) => {
    const res = await axios.get(fetchUrl, { responseType: 'arraybuffer' });
    if (res.data && instance.Client) {
      const imgName = `${uuidv4()}${Suffix}`;
      const { res: result } = await instance.Client.put(`app/${imgName}`, res.data);
      // 如果成功保存到新的文件
      // 动漫是1
      if (result.status === 200) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return dbConfig.save({ type: 'ImageMode', data: { type, url: `${imgName}` } });
      } else {
        return Promise.reject({ code: 203, msg: '操作失败请稍后!' });
      }

    }
  });
}
