import { Button, Card, Col, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { GetCompany } from '../../service/CompanyService';
import { checkAuthen, login } from '../../action';
import { setCookie } from '../../helpers/Cookie/Cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const requiredRule = [{ required: true}];
  
  
  const onFinish = async (values) => {
  // gọi action login và await mảng trả về
  const data = await dispatch(login(values.email, values.password));

  if (data.length > 0) {
    const time = 7;
    setCookie("id", data[0].id, time);
    setCookie("companyName", data[0].companyName, time);
    setCookie("email", data[0].email, time);
    setCookie("token", data[0].token, time);

    dispatch(checkAuthen(true));
    navigator('/home');
  } else {
  }
};

  return (
    <Row justify="center">
      <Col>
        <Card title="Đăng nhập" style={{ width: 400 }}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label="Email" name="email" rules={requiredRule}>
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
  );
}

export default Login;
