import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { useEffect, useState } from "react";
import { EditCompany, GetCompany } from "../../service/CompanyService";
import { getCookie } from "../../helpers/Cookie/Cookie";
const { TextArea } = Input;
function InfoCompany() {
    const [form] = Form.useForm();
    const idCompany = getCookie('id');
    const [Editing, setEditing] = useState(true);
    const [mes, contextHolder] = message.useMessage();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await GetCompany();
            const found = res.find(i => String(i.id) === idCompany);
            form.setFieldsValue({
                companyName: found.companyName,
                email: found.email,
                phone: found.phone,
                address: found.address,
                quantityPeople: found.quantityPeople,
                workingTime: found.workingTime,
                website: found.website,
                description: found.description,
                detail: found.detail
            });

        }
        fetchApi();
    }, [idCompany, form]);
    const handleEdit = () => {
        setEditing(prev => !prev);
    }
    const requiredRule = {
        required: true,
        message: "Trường này là bắt buộc"
    };

    const handleFinish = (e) => {
            const check = EditCompany(idCompany, e);
            if(check){
                mes.success('Cập nhật thành công');
                setEditing(prev => !prev);
            }
            else{
                mes.error('Chưa cập nhật thành công');
            }
        
    }
    return (
        <>
        {contextHolder}
            <div className="infoCompany">
                <Card title='Thông tin công ti' extra={<Button onClick={handleEdit}>{Editing ? 'Chỉnh sửa' : 'Hủy'}</Button>}>
                    <Form
                        form={form}
                        onFinish={handleFinish}
                        layout="vertical"
                        name="form"
                        initialValues={{ remember: true }}

                    >
                        <Form.Item label={'Tên công ti'} rules={[
                            requiredRule,
                            { type: "text", message: "Nhập tên công ti" }
                        ]}
                            name="companyName"
                        >
                            <Input disabled={Editing} />
                        </Form.Item>
                        <Row gutter={[10, 10]}>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item label={'Email'} rules={[
                                    requiredRule,
                                    { type: "email", message: "Email không hợp lệ" }
                                ]}
                                    name={'email'}
                                >
                                    <Input disabled={Editing} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item label={'Số điện thoại'} name={'phone'}>
                                    <Input disabled={Editing} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label={'Địa chỉ'} name={'address'}>
                                    <Input disabled={Editing} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[10, 10]}>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item label={'Số lượng nhân sự'} name={'quantityPeople'}>
                                    <Input disabled={Editing} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item label={'Thời gian làm việc'} name={'workingTime'}>
                                    <Input disabled={Editing} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label={'LinkWebsite'} name={'website'}>
                                    <Input disabled={Editing} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label={'Mô tả ngắn'} name={'description'}>
                            <TextArea rows={4} disabled={Editing}></TextArea>
                        </Form.Item>
                        <Form.Item label={'Mô tả chi tiết'} name={'detail'}>
                            <TextArea rows={7} disabled={Editing}></TextArea>
                        </Form.Item>
                        {!Editing
                            && (
                                <Form.Item label={null}>
                                    <Button type="primary" htmlType="submit">Cập nhật</Button>
                                </Form.Item>
                            )
                        }

                    </Form>
                </Card>
            </div>
        </>
    )
}
export default InfoCompany;