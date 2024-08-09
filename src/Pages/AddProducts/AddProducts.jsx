import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./AddProducts.scss";

const AddProducts = () => {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "dress",
  });

  const onFinish = async (values) => {
    try {
      const images = fileList.map((file) => file.url);
      const response = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, images }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const data = await response.json();
      console.log("Product added successfully:", data);
      message.success("Product added successfully");
      setFileList([]); 
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "dress",
      });
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add product");
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      const data = await response.json();
      setFileList((prev) => [...prev, { ...file, url: data.url }]);
      onSuccess(null, file);
    } catch (error) {
      onError(error);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Add Products</h1>

      <div className="form">
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={formData}
        >
          <Form.Item label="Name" name="name">
            <Input
              value={formData.name}
              onChange={handleFormChange}
            />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input
              value={formData.price}
              onChange={handleFormChange}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea
              value={formData.description}
              onChange={handleFormChange}
            />
          </Form.Item>
          <Form.Item name="image" label="Upload Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              customRequest={customRequest}
            >
              {fileList.length < 5 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value })}
            >
              <Select.Option value="dress">Dress</Select.Option>
              <Select.Option value="footwear">Footwear</Select.Option>
              <Select.Option value="headdress">Headdress</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProducts;
