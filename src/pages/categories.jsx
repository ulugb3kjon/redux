import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import carData from "../config/data/data";
import { EyeOutlined, EyeInvisibleFilled, SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function Cars() {
  const [searchText, setSearchText] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const filteredData = carData.filter((car) =>
    car.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id]
    );
  };
  const columns = [
    {
      title: "Brand Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => toggleExpand(record.id)}>
          {expandedRowKeys.includes(record.id) ? (
            <>
              <EyeInvisibleFilled /> Yopish
            </>
          ) : (
            <>
              <EyeOutlined /> Barcha malumotlar
            </>
          )}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          marginBottom: 20,
          padding: 20,
          borderRadius: 12,
          background: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Barcha Telefonlar</h2>
        <Search
          placeholder="Nomi boyicha qidirish"
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{
            width: 300,
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        />
      </div>

      {/* Table */}
      <Table
        dataSource={filteredData}
        columns={columns}
        bordered
        pagination={{ defaultPageSize: 4 }}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowKeys: expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
          expandedRowRender: (record) => (
            <div>
              {record.models && record.models.length > 0
                ? record.models.map((model) => (
                    <div key={model.id} style={{ padding: "4px 0" }}>
                      {model.name} - {model.price}
                    </div>
                  ))
                : "No models available"}
            </div>
          ),
        }}
      />
    </div>
  );
}
