import { Card, Button, message, Space } from "antd";
import { fetchType } from "@/type";
import FromEl, { FormProps } from "@/render/components/FormEl";
import { useEffect, useState } from "react";
let stopGettingImages = false;
const Alioss = () => {
  let [imgCount, setimgCount] = useState(0);
  let [fetchTypeValue, setfetchType] = useState<fetchType>({
    fetchUrl: "",
    Suffix: "",
    type: 1,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const component: FormProps[] = [
    { name: "bucket", label: "bucket名称", type: "Input" },
    { name: "region", label: "区域", type: "Input" },
    { name: "accessKeyId", label: "AccessKey ID", type: "Input" },
    { name: "accessKeySecret", label: "AccessKey Secret", type: "Input" },
  ];
  const componentFetch: FormProps[] = [
    { name: "fetchUrl", label: "请求地址", type: "Input" },
    { name: "Suffix", label: "图片后缀", type: "Input" },
    {
      name: "type",
      label: "图片类别",
      type: "Select",
      options: [
        { label: "动漫", value: 1 },
        { label: "真人", value: 2 },
        { label: "古风", value: 3 },
        { label: "壁纸", value: 4 },
        { label: "手机壁纸", value: 6 },
        { label: "涩图", value: 7 },
        { label: "coser", value: 8 },
        { label: "快手", value: 9 },
        { label: "腿图", value: 10 },
        { label: "原神图", value: 11 },
        { label: "原神cos", value: 12 },
        { label: "jk图", value: 13 },
        { label: "动漫风景图", value: 14 },
        { label: "acg", value: 15 },
      ],
    },
  ];
  const FinishEvent = async (values: any) => {
    await window.OSS.clientOss({
      bucket: "",
      region: "",
      accessKeyId: "",
      accessKeySecret: "",
    });
    checkStatus();
  };
  const checkStatus = async () => {
    const res = await window.OSS.checkOssStatus();
    if (res && res.res.status === 200) {
      messageApi.info("连接成功");
    } else {
      messageApi.info("连接失败");
    }
  };
  const getImg = async () => {
    if (!stopGettingImages) {
      setimgCount(0);
      return;
    }
    console.log(stopGettingImages, "stopGettingImages");

    const res = await window.OSS.getImage(fetchTypeValue);
    console.log(res, "res");

    if (res.code === 200) {
      if (stopGettingImages) {
        setimgCount(++imgCount);
      }
      messageApi.info(res.msg);
      getImg();
    }
  };
  const FinishEventGetImage = (value: fetchType) => {
    stopGettingImages = true;
    setfetchType(value);
  };
  const cancelHanle = () => {
    stopGettingImages = false;
  };
  useEffect(() => {
    getImg();
  }, [fetchTypeValue]);
  return (
    <div>
      {contextHolder}
      <Card>
        <FromEl
          component={component}
          FinishEvent={FinishEvent}
          btnTxt={{ okTxt: "链接oss" }}
        />
      </Card>
      <Card style={{ marginTop: "20px" }}>
        <FromEl
          component={componentFetch}
          overallArrange={{
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
          }}
          FinishEvent={FinishEventGetImage}
          btnTxt={{ okTxt: "开始获取" }}
          children={<Button onClick={() => cancelHanle()}>停止获取</Button>}
        />
      </Card>
      <h3>当前系列数量 {imgCount}</h3>
    </div>
  );
};

export default Alioss;
