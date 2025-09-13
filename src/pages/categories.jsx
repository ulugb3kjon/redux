import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import carData from "../config/data/data";
import { EyeOutlined, EyeInvisibleFilled} from "@ant-design/icons";


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
          {expandedRowKeys.includes(record.id) ? "Yopish" : "Barcha malumotlar"}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Barcha Telefonlar</h2>
        <Search
          placeholder="Search by brand name"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 250 }}
          allowClear
        />
      </div>

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
              {record.models && record.models.length > 0 ? (
                record.models.map((model) => (
                  <div key={model.id} style={{ padding: "4px 0" }}>
                    {model.name} - {model.price}
                  </div>
                ))
              ) : (
                "No models available"
              )}
            </div>
          ),
        }}
      />
    </div>
  );
}
