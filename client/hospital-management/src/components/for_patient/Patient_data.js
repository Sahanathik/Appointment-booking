import React, { useEffect, useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Typography } from "antd";
import {
  SearchOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Upload,
  Form,
  Modal,
  Select,
  Divider,
} from "antd";
import "./patient.css";
const { Title } = Typography;

const Patient = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  //dummy data

  const data = [
    {
      date: "2/2/2022",
      appointment_id: "12334545",
      specialist_name: "Dr.Sharan",
      department_name: "Cardiology",
    },
    {
      date: "2/2/2022",
      appointment_id: "12334545",
      specialist_name: "Dr.Sharan",
      department_name: "Cardiology",
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
    },
    {
      title: "Appointment Id",
      dataIndex: "appointment_id",
      key: "appointment_id",
      ...getColumnSearchProps("appointment_id"),
    },

    {
      title: "Doctor Name",
      dataIndex: "specialist_name",
      key: "specialist_name",
      ...getColumnSearchProps("specialist_name"),
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
      ...getColumnSearchProps("department_name"),
    },
    {
      title: "Your Report",
      dataIndex: "",
      width: "15%",
      fixed: "right",
      key: "x",
      render: (data) => (
        <>
          <Button onClick={() => {}}>Your Report</Button>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      width: "15%",
      fixed: "right",
      key: "x",
      render: (data) => (
        <>
          <Button onClick={() => {}}>Book Appointment</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="paitent-sidebar">
          <div>
            <button
              class="btn rounded-pill text-white btn side-button py-0 px-2 mt-3 mb-3 ms-1"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              Click here To See Your Profile
              <i class="fa-solid fa-angles-right"></i>
            </button>
            <div
              class="offcanvas offcanvas-start"
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div class="offcanvas-header">
                <h5
                  class="offcanvas-title text-white mx-auto"
                  id="offcanvasExampleLabel"
                >
                  Your Profile
                </h5>
                <button
                  type="button"
                  class="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body p-0">
                <div className="card w-75 mx-auto border-0 detail-card mt-4">
                  <div className="card-header d-flex justify-content-end">
                    <button className="pa-profile-btn">Edit</button>
                  </div>
                  <div className="card-body">
                    <p>PatientId : Pa-1234555</p>
                    <p>Name : &ensp;first&nbsp;last </p>
                    <p>Mobile : 9659022226</p>
                    <p>Gender : male</p>
                    <p>Email : example@gmail.com</p>
                    <div className="d-flex"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="patient-haeder">
        <p>
          ” Our Mission Is To Bring Healthcare Of International Standards Within
          The Reach Of Every Individual.”
        </p>
        <p>For New Appointment, click below</p>
        <button className="btn new-app-btn">Book New Appointment</button>
      </header>

      <div className="container-fluid mt-4 px-4 pat-table">
        <Title level={3} style={{ textAlign: "center" }} className="mb-4">
          YOUR APPOINTMENT HISTORY
        </Title>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
};

export default Patient;
