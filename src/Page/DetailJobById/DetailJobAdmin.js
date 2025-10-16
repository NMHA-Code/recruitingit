import { Col, Row, Space, Tag } from "antd";
import { data, useParams } from "react-router-dom";
import Goback from "../../components/Goback/goback";
import { useEffect, useState } from "react";
import { GetJob } from "../../service/JobService";

function DetailJobAdmin() {
    const { id } = useParams();
    const [datajobs, setdatajobs] = useState({});
    useEffect(() => {
        const callApi = async () => {
            const res = await GetJob();
            const findJob = res.find(i => String(i.id) === id);
            setdatajobs(findJob);
        }
        callApi();
    }, [id]);
    return (
        <>
                <Row gutter={[20, 20]} >
                    <Col span={24}>
                        <Goback />
                    </Col>
                    <Col span={24}>
                    <div className="space-col">

                        <h2>Tên jobs: {datajobs.name}</h2>
                        <div>
                            <label>Trạng thái: </label> <Tag color={datajobs.status ? 'green' : 'red'}>{datajobs.status ? 'Đang bật' : 'Đang tắt'}</Tag>
                        </div>
                        <div>
                            <label>Tags: </label>
                            {datajobs.tags
                                ? datajobs.tags.map((t, idx) => (
                                    <Tag key={idx} color="blue">{t}</Tag>
                                ))
                                : 'Không có tags'}
                        </div>
                        <div>
                            Mức lương: <strong>{datajobs.salary}$</strong>
                        </div>

                        <div>
                            Ngày tạo: <strong>{datajobs.createAt}</strong>
                        </div>
                        <div>
                            Cập nhật: <strong>{datajobs.updateAt}</strong>
                        </div>
                        <div>
                            <label>Thành phố: </label>
                            {datajobs.city
                                ? datajobs.city.map((t, idx) => (
                                    <Tag key={idx} color="gold">{t}</Tag>
                                ))
                                : 'Không có tags'}
                        </div>
                        <div>
                            <p>Mô tả:</p><br />
                            {datajobs.description}
                        </div>
                        
                    </div>
                    </Col>
                </Row>
        </>
    )
}
export default DetailJobAdmin;