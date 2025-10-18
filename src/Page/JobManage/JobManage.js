import { Table, Alert, message, Popconfirm, Space, Tag, Modal, Button, Form, Input, Row, Col, InputNumber, Select, Switch } from "antd";
import { NavLink } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getCookie } from "../../helpers/Cookie/Cookie";
import { useCallback, useEffect, useState } from "react";
import { DeleteJob, EditJob, GetJob, PostJob } from "../../service/JobService";
import { getCurrentDateTime } from "../../components/Gettime/GetTimeCurrently";
const { TextArea } = Input;
function JobManage() {
  const companyId = getCookie("id");
  const [form] = Form.useForm();
  const [listjob, setListjob] = useState([]);
  const [msgApi, contextHolder] = message.useMessage();
  const [editingJob, setEditingJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (record) => {
    setEditingJob(record);
    form.setFieldsValue({
      name: record.name,
      tags: record.tags,
      salary: record.salary,
      city: record.city,
      description: record.description,
      status: record.status,
    });
    setIsModalOpen(true);
  };
  const fetchJobs = useCallback(async () => {
    try {
      const all = await GetJob();
      const filtered = all.filter((job) => String(job.idCompany) === companyId);
      setListjob(filtered);
    } catch {
      msgApi.error("Không tải được danh sách công việc");
    }
  }, [companyId, msgApi]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = async (jobId) => {
    try {
      const ok = await DeleteJob(jobId);
      if (ok) {
        msgApi.success("Xóa thành công");
        fetchJobs();
      } else {
        throw new Error();
      }
    } catch {
      msgApi.error("Xóa thất bại, thử lại sau");
    }
  };
  const onfinish = async (e) => {
    const payload = {
      ...e,
      updateAt: getCurrentDateTime(),
      id: editingJob.id,
    
    };
    const check = await EditJob(editingJob.id, payload);
    if(check){
      msgApi.success('Cập nhật thành công!');
      form.resetFields();
      setIsModalOpen(false);
      fetchJobs();
    }
    else{
      msgApi.error('Thất bại cập nhật!');
    }

  }

  const columns = [
    {
      title: "Tên jobs",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => tags.map((t) => <Tag color="blue" key={t}>{t}</Tag>),
    },
    {
      title: "Mức Lương",
      dataIndex: "salary",
      key: "salary",
      render: (s) => `${s}$`,
    },
    {
      title: "Thời gian",
      dataIndex: "createAt",
      key: "createAt",
      render: (d) => <span>Ngày tạo: {d}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (st) =>
        st ? (
          <Alert message="Đang bật" type="success" />
        ) : (
          <Alert message="Đang tắt" type="warning" />
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="action-icon">
          
            <NavLink to={`/detail-job/${record.id}`} className='navlinkEye'>
                <EyeOutlined className="eye p-item" />
          </NavLink>
          
          
          <EditOutlined className="edit p-item" onClick={() => showModal(record)} />
          <Modal
          mask={false}
            title="Chỉnh sửa jobs"
            open={isModalOpen}
            onCancel={() => {
              form.resetFields();
              setIsModalOpen(false);
            }}
            footer={null}
          >
            <Form
              form={form}
              layout="vertical"
              name="formjob"
              onFinish={onfinish}
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Tên jobs"
                    name="name"
                    rules={[{ required: true, message: 'Nhập tên jobs' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    label="Tags"
                    name="tags"
                    rules={[{ required: true, message: 'Nhập tags' }]}
                  >
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Nhập tag và nhấn Enter"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Lương"
                    name="salary"
                    rules={[{ required: true, message: 'Nhập Lương' }]}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Thành phố"
                    name="city"
                    rules={[{ required: true, message: 'Nhập City' }]}
                  >
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Nhập thành phố"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Nhập description' }]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Trạng thái"
                    name="status"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
          <Popconfirm
            title="Xóa công việc này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="delete p-item" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="jobManage">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div className="jobManage__newjob">
            <h3>Danh sách việc làm</h3>
            <div className="jobManage__newjob-inline">
              <NavLink to="/create-job" className="navlink">
                <PlusOutlined />
                <span className="nav-text">Tạo việc mới</span>
              </NavLink>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={listjob}
            //  ở đây nó sẽ lấy ra mảng r trả ra object chuẩn theo cái id đó
            rowKey="id"
            // rowkey là sẽ chỉ định cho mỗi row sẽ có một key đúng như của nó 
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content" }}
          />
        </Space>
      </div>
    </>
  );
}

export default JobManage;