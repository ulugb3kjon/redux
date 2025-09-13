import React, { useState } from "react";
import {
  Table,
  Select,
  Button,
  Modal,
  Space,
  Form,
  Input,
  Popconfirm,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addCar, editCar, deleteCar } from "../redux/cardSlice";
import { EditOutlined, EyeFilled, DeleteOutlined } from "@ant-design/icons";

const { Column } = Table;

export default function CarPage() {
  const cars = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [selectedModel, setSelectedModel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModels, setSelectedModels] = useState({});
  const [editCarData, setEditCarData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleShow = (recordKey) => {
    const model = selectedModels[recordKey];
    if (model) {
      setSelectedModel(model);
      setIsModalOpen(true);
    }
  };

  const handleEdit = (car) => {
    setEditCarData(car);
    form.setFieldsValue({
      ...car,
      models: car.models.map((m) => ({ ...m })), 
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (values) => {
    const updatedModels = values.models.map((m, idx) => {
      if (!m.id) m.id = `model_${Date.now()}_${idx}`;
      return { ...m, price: Number(m.price) };
    });

    dispatch(editCar({ id: editCarData.id, updates: { ...values, models: updatedModels } }));
    setIsEditModalOpen(false);
    form.resetFields();
  };

  const handleAddCar = (values) => {
    const newCar = {
      id: `car_${Date.now()}`,
      name: values.name,
      description: values.description,
      models: values.models.map((m, idx) => ({
        id: `model_${Date.now()}_${idx}`,
        name: m.name,
        price: Number(m.price),
      })),
    };
    dispatch(addCar(newCar));
    setIsAddModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <h2 style={{ marginBottom: "16px" }}>Mashina Brendlari</h2>
      <Button
        type="primary"
        style={{ marginBottom: "16px" }}
        onClick={() => {
          form.resetFields();
          setIsAddModalOpen(true);
        }}
      >
        + Yangi mashina qo‘shish
      </Button>

      <Table
        dataSource={cars.map((c) => ({ key: c.id, ...c }))}
        bordered
        pagination={false}
      >
        <Column title="Brend" dataIndex="name" key="name" />
        <Column title="Izoh" dataIndex="description" key="description" />
        <Column
          title="Turlari"
          key="models"
          render={(_, record) => (
            <Space>
              <Select
                placeholder="Model tanlang"
                style={{ width: 200 }}
                options={record.models.map((m) => ({
                  value: m.id,
                  label: m.name,
                }))}
                onChange={(value) => {
                  const model = record.models.find((m) => m.id === value);
                  setSelectedModels((prev) => ({ ...prev, [record.key]: model }));
                }}
              />

              <Button
                onClick={() => handleShow(record.key)}
                disabled={!selectedModels[record.key]}
              >
                <div style={{ alignItems: "center" }}>
                  VIEW <EyeFilled />
                </div>
              </Button>

              <Button type="primary" onClick={() => handleEdit(record)}>
                EDIT
                <EditOutlined />
              </Button>

              <Popconfirm
                title="Rostan ham o'chirmoqchimisiz?"
                onConfirm={() => dispatch(deleteCar(record.id))}
                okText="Ha"
                cancelText="Yo'q"
                placement="bottomRight"
              >
                <Button danger>
                  DELETE <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      {/* Show modal */}
      <Modal
        title="Model haqida ma’lumot"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Yopish
          </Button>,
        ]}
      >
        {selectedModel ? (
          <div style={{ lineHeight: "1.8", fontSize: "16px" }}>
            <p>
              <b>Tur:</b> {selectedModel.name}
            </p>
            <p>
              <b>Narxi:</b> ${selectedModel.price}
            </p>
            <p>
              <b>ID:</b> {selectedModel.id}
            </p>
          </div>
        ) : (
          <p>Model tanlanmagan</p>
        )}
      </Modal>

      <Modal
        title="Brendni tahrirlash"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleSaveEdit} layout="vertical">
          <Form.Item
            name="name"
            label="Brend nomi"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Izoh"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.List name="models">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      fieldKey={[field.fieldKey, "name"]}
                      rules={[
                        { required: true, message: "Model nomi kiritilsin" },
                      ]}
                    >
                      <Input placeholder="Model nomi" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "price"]}
                      fieldKey={[field.fieldKey, "price"]}
                      rules={[{ required: true, message: "Narx kiritilsin" }]}
                    >
                      <Input type="number" placeholder="Narxi" />
                    </Form.Item>
                    <Button type="danger" onClick={() => remove(field.name)}>
                      X
                    </Button>
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  + Yangi model qo‘shish
                </Button>
              </>
            )}
          </Form.List>

          <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
            Saqlash
          </Button>
        </Form>
      </Modal>

      {/* Add Modal */}
      <Modal
        title="Yangi mashina qo‘shish"
        open={isAddModalOpen}
        onCancel={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddCar} layout="vertical">
          <Form.Item
            name="name"
            label="Brend nomi"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Izoh"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.List name="models">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      fieldKey={[field.fieldKey, "name"]}
                      rules={[
                        { required: true, message: "Model nomi kiritilsin" },
                      ]}
                    >
                      <Input placeholder="Model nomi" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "price"]}
                      fieldKey={[field.fieldKey, "price"]}
                      rules={[{ required: true, message: "Narx kiritilsin" }]}
                    >
                      <Input type="number" placeholder="Narxi" />
                    </Form.Item>
                    <Button type="danger" onClick={() => remove(field.name)}>
                      X
                    </Button>
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  + Yangi model qo‘shish
                </Button>
              </>
            )}
          </Form.List>

          <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
            Qo‘shish
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
