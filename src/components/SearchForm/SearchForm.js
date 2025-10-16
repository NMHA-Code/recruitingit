import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { GetCity } from "../../service/CityService";
import { useNavigate } from "react-router-dom";
import { GetTags } from "../../service/TagService";

function SearchForm() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [getCity, setCity] = useState([]);
    const [getTags, setTags] = useState([]);
    useEffect(() => {
        const cityApi = async () => {
            const [rawCity, rawtag] = await Promise.all([
                GetCity('cities'),
                GetTags('tags')
            ]);
            setCity(rawCity);
            setTags(rawtag);
        }
        cityApi();
    }, []);

    const onFinish = (values) => {
        const { category, query } = values;
        if (!category && !query) {
            alert('Vui lòng chọn thành phố hoặc tag');
            return;
        }
        const q = new URLSearchParams();
        if (getCity.find(i => i.value === category)) q.set('city', category);

        if (getTags.find(i => i.value === query)) q.set('tag', query);
        navigate(`/Search?${q.toString()}`);
    };

    return (
        <div className="Searchfrom">
            <Form
                form={form}
                layout="inline"
                onFinish={onFinish}
            >
                <Row gutter={[20,20]}>
                    <Col md={12} lg={6}>
                        <Form.Item name="category">
                            <Select placeholder="Thành phó" style={{ minWidth: 160 }} options={getCity} />
                        </Form.Item>
                    </Col>
                    <Col md={12} lg={12}>
                        <Form.Item name="query">
                            <Input placeholder="Từ khoá tìm kiếm" style={{ minWidth: 300 }} />
                        </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
export default SearchForm;
