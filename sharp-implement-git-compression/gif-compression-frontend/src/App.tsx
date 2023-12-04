import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Form, Input, Button } from "antd";
import axios from "axios";

const { Dragger } = Upload;

const App = () => {
  const [form] = Form.useForm(); // 创建表单实例
  const [filePath, setFilePath] = useState(""); // 存储文件路径的状态变量
  const [fileName, setFileName] = useState(""); // 存储文件名的状态变量

  // 定义压缩函数
  const compress = async (values: any) => {
    // 发送HTTP请求至服务器进行图片压缩
    const res = await axios.get("http://localhost:3001/compression", {
      params: {
        color: values.color || 256,
        level: values.level || 9,
        path: filePath,
      },
      responseType: "arraybuffer",
    });

    // 将压缩后的图片数据转换成Blob对象
    const blob = new Blob([res.data], { type: "image/jpeg" });

    // 创建下载链接并模拟点击下载
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    message.success("压缩成功");
  };

  // 定义上传组件的props
  const props = {
    name: "file",
    action: "http://localhost:3001/upload",
    onChange(info: { file: { response?: any; name?: any; status?: any } }) {
      const { status } = info.file;
      if (status === "done") {
        // 保存上传成功的文件路径和文件名
        setFilePath(info.file.response);
        setFileName(info.file.name);

        message.success(`${info.file.name} 文件上传成功`);
      } else if (status === "error") {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  // 渲染组件
  return (
    <div>
      <Form
        style={{ width: 500, margin: "50px auto" }}
        form={form}
        onFinish={compress} // 设置表单提交回调
      >
        {/* 颜色数量输入框 */}
        <Form.Item label="颜色数量" name="color">
          <Input />
        </Form.Item>

        {/* 文件上传组件 */}
        <Form.Item>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
          </Dragger>
        </Form.Item>

        {/* 压缩按钮 */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            压缩
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
