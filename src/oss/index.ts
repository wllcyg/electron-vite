const OSS = require("ali-oss");

// 实现一个单例模式的类
type Client = {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string
}
export default class OssSingleton {
  private static instance: OssSingleton;
  Client: null
  private constructor() { }
  public static getInstance(): OssSingleton {
    if (!OssSingleton.instance) {
      OssSingleton.instance = new OssSingleton();
    }
    return OssSingleton.instance;
  }
  initClient(Client: Client) {
    this.Client = new OSS({
      region: Client.region,
      accessKeyId: Client.accessKeyId,
      accessKeySecret: Client.accessKeySecret,
      bucket: Client.bucket
    });
    console.log(this.Client, 'this is Client');
  }
  async listBuckets() {
    try {
      // 列举当前账号所有地域下的存储空间。
      let result;
      if (this.Client) {
        result = await this.Client.listBuckets();
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}