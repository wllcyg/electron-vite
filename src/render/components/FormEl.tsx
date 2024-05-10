import { Form, Input, Select, Button, Space } from "antd";
type LayoutType = Parameters<typeof Form>[0]["layout"];
export interface FormProps {
  name: string;
  rules?: any[];
  label: string;
  type: "Input" | "Select";
  options?: { label: string; value: string | number | boolean }[];
}
interface Props {
  LayoutType?: LayoutType;
  overallArrange?: {
    labelCol: { span: number };
    wrapperCol: { span: number };
  };
  component: FormProps[];
  FinishEvent?: (values: any) => void;
  btnTxt?: {
    okTxt?: string;
    cancelTxt?: string;
  };
}
const FromEl = ({
  LayoutType = "inline",
  overallArrange = {
    labelCol: { span: 9 },
    wrapperCol: { span: 14 },
  },
  component,
  FinishEvent,
  btnTxt,
}: Props) => {
  const { labelCol, wrapperCol } = overallArrange;
  const { okTxt = "提交", cancelTxt = "重置" } = btnTxt || {};
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout={LayoutType}
      labelCol={overallArrange.labelCol}
      wrapperCol={overallArrange.wrapperCol}
      onFinish={(values) => {
        FinishEvent(values);
      }}
      onReset={() => {
        form.resetFields();
        FinishEvent({});
      }}
    >
      {component.map(({ name, label, type, options }) => {
        let RenderComponent = null;
        switch (type) {
          case "Input":
            RenderComponent = <Input placeholder={`输入${label}`} />;
            break;
          case "Select":
            RenderComponent = <Select options={options} />;
          default:
            break;
        }
        return (
          <Form.Item
            key={name}
            label={label}
            name={name}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            {RenderComponent}
          </Form.Item>
        );
      })}
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {okTxt}
          </Button>
          <Button type="dashed" htmlType="reset">
            {cancelTxt}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FromEl;
