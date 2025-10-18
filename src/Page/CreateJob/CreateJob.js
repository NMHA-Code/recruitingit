import { useEffect, useState } from 'react';
import { getCookie } from '../../helpers/Cookie/Cookie';
import { getCurrentDateTime } from '../../components/Gettime/GetTimeCurrently';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Row,
  Select,
  Switch
} from 'antd';
import { GetTags, PostTags } from '../../service/TagService';
import { GetCity, PostCity } from '../../service/CityService';
import { PostJob } from '../../service/JobService';

const { TextArea } = Input;

function CreateJob() {
  const idCompany = getCookie('id');
  const [noti, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const requiredRule = [{ required: true, message: 'Vui lòng nhập trường này' }];

  const [tags, setTags] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetTags();
      if(res){
        setTags(res);
      }
    };
    fetchData();
  }, []);
useEffect(() => {
    const fetchData = async () => {
      const res = await GetCity();
      if(res){
        setCities(res);
      }
    };
    fetchData();
  }, []);
  const onFinish = async (values) => {
    values.idCompany = idCompany;
    values.createAt = getCurrentDateTime();
    const res = await PostJob(values);
    if(res){
      form.resetFields();
      noti.success({
        message: 'Tạo job thành công',
      })
    }
    else{
      noti.error({
        message: 'Tạo job không thành công',
      })
    }
  }


  const onFinishFailed = (errorInfo) => {
    console.log('Validate Failed:', errorInfo);
    message.error('Vui lòng điền đầy đủ thông tin.');
  };

  return (
    <>
      {contextHolder}
      <Card title="Ứng tuyển ngay">
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="Tên job" name="name" rules={requiredRule}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="Tags" name="tags" rules={requiredRule}>
                <Select
                  mode="multiple"
                  options={tags}
                  placeholder="Nhập hoặc chọn tag"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="Thành phố" name="city" rules={requiredRule}>
                <Select
                  mode="multiple"
                  options={cities}
                  placeholder="Chọn hoặc nhập thành phố"
                />
              </Form.Item>
            </Col>
            

            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="Mức Lương"
                name="salary"
                rules={[{ required: true, message: 'Vui lòng nhập mức lương' }]}
              >
                <InputNumber min={0}/>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="Mô tả công việc" name="description">
                <TextArea rows={4} placeholder="Mô tả chi tiết" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="status">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng tuyển
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default CreateJob;