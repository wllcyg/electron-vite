import { Card, Button, message, Space } from "antd";
import { AxiosRequest } from "@/render/request";
import FromEl, { FormProps } from "@/render/components/FormEl";
const Alioss = () => {
  const request = new AxiosRequest({});
  const component: FormProps[] = [
    { name: "bucket", label: "bucket名称", type: "Input" },
    { name: "region", label: "区域", type: "Input" },
    { name: "accessKeyId", label: "AccessKey ID", type: "Input" },
    { name: "accessKeySecret", label: "AccessKey Secret", type: "Input" },
  ];
  const FinishEvent = async (values: any) => {
    const res = await window.OSS.clientOss({
      bucket: "lianwan",
      region: "oss-cn-beijing",
      accessKeyId: "LTAI5tDUEUxsCcVUvjsXfcjd",
      accessKeySecret: "JRheG0fTtbwuhxkZFrzpg1QxWFKR8o",
    });
    console.log(res, "this is value from el");
  };
  const checkStatus = async () => {
    const res = await window.OSS.checkOssStatus();
    console.log(res, "status");
    if (res && res.res.status === 200) {
      message.success("连接成功");
    } else {
      message.error("连接失败");
    }
  };
  const getImg = () => {
    console.log(
      request.get("https://cdn.seovx.com/?mom=302"),
      "requestrequest"
    );
  };
  // 这个页面循环请求其他网站图片上传到oss,并且吧地址存放到数据库中
  return (
    <div>
      <Card>
        <FromEl component={component} FinishEvent={FinishEvent} />
      </Card>
      <Card style={{ marginTop: "20px" }}>
        <Space>
          <Button type="primary" onClick={() => checkStatus()}>
            检查连接状态
          </Button>
          <Button type="primary" onClick={() => getImg()}>
            获取图片
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Alioss;
