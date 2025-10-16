import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetJob } from "../../service/JobService";
import Goback from "../../components/Goback/goback";
import { Button, Card, Col, Form, Input, Row, Select, Tag, InputNumber, message, notification, Space } from "antd";
import { GetCompany } from "../../service/CompanyService";
import { getCurrentDateTime } from "../../components/Gettime/GetTimeCurrently";
import { PostCV } from "../../service/CVService";

const { TextArea } = Input;

function JobDetail() {
  const { id } = useParams();
  const [noti, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const requiredRule = [{ required: true, message: "Vui lòng nhập trường này" }];
  const [DetailJob, setDetailJob] = useState(null);
  const [AddressCompany, setAddressCompany] = useState(null);

  useEffect(() => {
    const CallApi = async () => {
      const [rawDetailJob, rawAddressCompany] = await Promise.all([GetJob(), GetCompany()]);
      const findJob = rawDetailJob.find(i => String(i.id) === String(id));
      if (!findJob) {
        setDetailJob(null);
        setAddressCompany(null);
        return;
      }
      const findAddress = rawAddressCompany.find(i => String(i.id) === String(findJob.idCompany));
      setDetailJob(findJob);
      setAddressCompany(findAddress || null);
    };
    CallApi();
  }, [id]);

  const OnFinish = async (values) => {
    values.idJob = DetailJob.id;
    values.idCompany = AddressCompany.id;
    values.createAt = getCurrentDateTime();
    values.statusRead = false;
    const res = await PostCV(values);
    if(res){
      form.resetFields();
      noti.success({
        message: 'Gửi yêu cầu thành công',
        description: 'Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất'
      })
    }
    else{
      noti.error({
        message: 'Gửi yêu cầu không thành công',
        description: 'Hệ thống lỗi vui lòng gửi lại yêu cầu'
      })
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Validate Failed:", errorInfo);
    message.error("Vui lòng điền đầy đủ thông tin.");
  };

  return (
    
    <>
    {contextHolder}
    
    <div className="jobs">
      <div className="jobs__goback">
        <Goback />
      </div>

      <div className="jobs__detail">
        {DetailJob ? (
          <>
            <h1>{DetailJob.name}</h1>
            <div className="jobs__detail-appy">
              <Button type="primary" onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}>
                ỨNG TUYỂN NGAY
              </Button>
            </div>

            <div className="jobs__detail-info">
              <span>Tags: </span>
              {DetailJob.tags?.length ? <Space wrap size={[6,6]}> {DetailJob.tags.map((i, idx) => <Tag key={i + idx}color="blue">{i}</Tag>)}</Space> : <p>Không có tag</p>}
            </div>

            <div className="jobs__detail-info">
              <span>Thành phố: </span>
              {DetailJob.city?.length ? <Space wrap size={[6,6]}> {DetailJob.city.map((i, idx) => <Tag key={i + idx} color="warning">{i}</Tag>)}</Space> : <p>Không có thành phố</p>}
            </div>

            <div className="jobs__detail-info">
              <span>Mức lương: </span>
              <strong>{DetailJob.salary}$</strong>
            </div>

            <div className="jobs__detail-info">
              <span>Địa chỉ công ty: </span>
              <strong>{AddressCompany?.address ?? "Chưa có địa chỉ"}</strong>
            </div>

            <div className="jobs__detail-info">
              <span>Thời gian đăng bài: </span>
              <strong>{DetailJob.createAt}</strong>
            </div>

            <div className="jobs__detail-info">
              <span>Chi tiết công việc: </span>
              <div>{DetailJob.description}</div>
            </div>
          </>
        ) : (
          <p>Không tìm thấy job</p>
        )}
      </div>

      <div className="jobs__applys" id="apply">
        <Card title="Ứng tuyển ngay">
          <Form
            name="formApply"
            form={form}
            onFinish={OnFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Row gutter={[20,20]}>
              <Col xs={24} sm={12} lg={6}>
                <Form.Item label="Họ và tên" name="name" rules={requiredRule}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Form.Item label="Số điện thoại" name="phone" rules={requiredRule}>
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Email không hợp lệ" }]}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Form.Item label="Thành phố" name="city" rules={requiredRule}>
                  <Select
                    options={DetailJob?.city?.map(i => ({ value: i, label: i })) ?? []}
                    placeholder="Chọn thành phố"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item label="Giới thiệu bản thân" name="description">
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item label="Danh sách link project đã làm" name="linkProject">
                  <TextArea rows={5} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
    </>
  );
}

export default JobDetail;
