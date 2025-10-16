import {
  Table,
  Alert,
  message,
  Popconfirm,
  Space,
} from "antd";
import { NavLink } from "react-router-dom";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCookie } from "../../helpers/Cookie/Cookie";
import { useCallback, useEffect, useState } from "react";
import { DeleteCV, GetCV } from "../../service/CVService";
import { GetJob } from "../../service/JobService";

function CVManage() {
  const companyId = getCookie("id");
  const [listCv, setListCv] = useState([]);
  const [msgApi, contextHolder] = message.useMessage();

  const fetchData = useCallback(async () => {
    try {
      const [cvs, jobs] = await Promise.all([GetCV(), GetJob()]);
      const filteredCv = cvs.filter(
        (cv) => String(cv.idCompany) === companyId
      );
      const filteredJobs = jobs.filter(
        (job) => String(job.idCompany) === companyId
      );
      const cvWithJobName = filteredCv.map((cv) => {
        const jobId = cv.jobId ?? cv.idJob;
        const job = filteredJobs.find((j) => j.id === jobId);
        return {
          ...cv,
          namejob: job ? job.name : "Không tìm thấy job",
        };
      });

      setListCv(cvWithJobName);
    } catch {
      msgApi.error("Không tải được dữ liệu CV/Job");
    }
  }, [companyId, msgApi]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (cvId) => {
    try {
      const ok = await DeleteCV(cvId);
      if (ok) {
        msgApi.success("Xóa thành công");
        fetchData();
      } else {
        throw new Error("Xóa thất bại");
      }
    } catch {
      msgApi.error("Xóa thất bại, thử lại sau");
    }
  };

  const columns = [
    {
      title: "Tên job",
      dataIndex: "namejob",
      key: "namejob",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusRead",
      key: "statusRead",
      render: (statusRead) =>
        statusRead ? (
          <Alert message="Đã đọc" type="success" />
        ) : (
          <Alert message="Chưa đọc" type="warning" />
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NavLink
            to={`/detail-cv/${record.id}`}
            className="navlinkEye"
          >
            <EyeOutlined />
          </NavLink>
          <Popconfirm
            title="Xóa CV này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="CvManage">
        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%" }}
        >
          <h3>Danh sách CV ứng viên</h3>
          <Table
            columns={columns}
            dataSource={listCv}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content" }}
          />
        </Space>
      </div>
    </>
  );
}

export default CVManage;