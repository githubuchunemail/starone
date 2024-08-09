import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../../Components/Card/Card";
import { Modal, Input, Form, Select, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./Dashboard.scss";

const Dashboard = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        console.log(`Product ${id} deleted`);
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const handleEditClick = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category || "",
      image: typeof product.image === 'string' ? product.image : product.image.fileList[0]?.thumbUrl || "",
    });
    
    setFileList(
      typeof product.image === 'string' 
        ? [{ url: product.image }] 
        : product.image.fileList || []
    );
    
    setIsModalVisible(true);
  };

  // Formdagi ma’lumotlarni yangilash
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Rasmni yuklash o'zgarishi
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    
    if (newFileList.length > 0 && newFileList[0].thumbUrl) {
      setFormData({ ...formData, image: newFileList[0].thumbUrl });
    } else if (newFileList.length > 0 && newFileList[0].url) {
      setFormData({ ...formData, image: newFileList[0].url });
    }
  };

  const handleSave = () => {
    const updatedData = {
      ...formData,
      image: fileList.length > 0 ? fileList[0].thumbUrl || fileList[0].url : formData.image,
    };

    fetch(`http://localhost:8000/products/${editingProduct}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        setProducts(
          products.map((product) =>
            product.id === editingProduct ? updatedProduct : product
          )
        );
        setEditingProduct(null);
        setIsModalVisible(false);
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div className="Dashboard">
      <div className="card__wrapper">
        {products.length === 0 ? (
          <h1>No products added yet</h1>
        ) : (
          products.map((item) => (
            <div key={item.id}>
              <Card
                category={item.category}
                title={item.name}
                price={item.price}
                description={item.description}
                img={typeof item.image === 'string' ? item.image : (item.image.fileList[0]?.thumbUrl || "https://picsum.photos/150/150")}
                onDelete={() => handleDelete(item.id)}
                onEdit={() => handleEditClick(item)}
              />
            </div>
          ))
        )}
      </div>

      <Modal
        title="Edit Product"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              name="price"
              value={formData.price}
              onChange={handleFormChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Select
              name="category"
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value })}
            >
              <Select.Option value="dress">Dress</Select.Option>
              <Select.Option value="footwear">Footwear</Select.Option>
              <Select.Option value="headdress">Headdress</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false} 
            >
              {fileList.length < 1 && <PlusOutlined />}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
