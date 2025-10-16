import { Button, Card, Col, Form, Input, message, Row } from 'antd';
import { useState } from 'react';
import { PostCompany } from '../../service/CompanyService';
import { register } from '../../action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ganeratorToken } from '../../helpers/Token/ganerator';

function Register() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // đổi tên tránh trùng
  const requiredRule = [{ required: true }];
  const [mes, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
      const registerResult = await dispatch(register(values.companyName, values.email, values.password));
        if (registerResult) {
          mes.success('Đăng ký thành công');
          navigate('/login');
        } else {
          mes.error('Tạo công ty thất bại, thử lại sau');
        }
    }

  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col>
          <Card title="Đăng kí" style={{ width: 400 }}>
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item label="Tên công ty" name="companyName" rules={requiredRule}>
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={requiredRule}>
                <Input />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={requiredRule}>
                <Input.Password />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Register;
