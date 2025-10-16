import { useEffect, useState } from "react";
import Goback from "../../components/Goback/goback";
import { NavLink, useParams } from "react-router-dom";
import { GetCompany } from "../../service/CompanyService";
import { GetJob } from "../../service/JobService";
import { Card, Col, Row, Space, Tag } from "antd";

function CompanyDetail() {
    const [companyDetail, setCompanyDetail] = useState(null);
    const [companyJob, setcompanyJob] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const CallApi = async () => {
            const [rawcompany, rawcompanyjob] = await Promise.all([
                GetCompany(),
                GetJob()
            ]);

            const object = rawcompany.find(i => String(i.id) === id);
            const listJob = rawcompanyjob.filter(i => String(i.idCompany) === id);
            setCompanyDetail(object);
            setcompanyJob(listJob);
        };
        CallApi();
    }, [id]);

    return (
        <div className="companyDetail">
            <div className="companyDetail__goback">
                <Goback />
            </div>

            <div className="companyDetail__info">
                {companyDetail ? (
                    <>
                        <h1>{companyDetail.companyName}</h1>

                        <div className="info-row">
                            <span className="info-label">Địa chỉ: </span>
                            <strong className="info-value">{companyDetail.address}</strong>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Số lượng nhân sự: </span>
                            <strong className="info-value">{companyDetail.quantityPeople}</strong>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Thời gian làm việc: </span>
                            <strong className="info-value">{companyDetail.workingTime}</strong>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Link Website: </span>
                            <strong className="info-value">{companyDetail.website}</strong>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Mô tả ngắn: </span>
                            <div className="info-value description">
                                {companyDetail.description}
                            </div>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Mô tả chi tiết: </span>
                            <div className="info-value description">
                                {companyDetail.detail}
                            </div>
                        </div>
                        <div className="companyDetail__jobs">
                            <p>Danh sách các job: </p>
                            <Row gutter={[20, 20]}>
                                {companyJob.map(i => (
                                    <Col xs={24} sm={24} md={12} lg={8} key={i.id}>
                                        <Card title={<NavLink to={`/jobs/${i.id}`} className={'jobnavlink'}>{i.name}</NavLink>}>
                                            <div className="jobinfo">
                                                <p>Ngôn ngữ: {' '}
                                                    {i.tags.map((tags, index) => (
                                                        <Tag color="blue" key={index}>{tags}</Tag>
                                                    ))}
                                                </p>
                                            </div>
                                            <div className="jobinfo">
                                                <p>Thành phố:{' '}
                                                    {i.city.map((citys, index) => (
                                                        <Tag color="warning" key={index}>{citys}</Tag>
                                                    ))}
                                                </p>
                                            </div>
                                            <div className="jobinfo">
                                                <span>Lương: </span>
                                                <strong>{i.salary}$</strong>
                                            </div>
                                            <div className="jobinfo">
                                                <span>Công ty: <strong>{companyDetail.companyName}</strong></span>
                                            </div>
                                            <div className="jobinfo">
                                                <span>Ngày tạo: </span>
                                                <strong>{i.createAt}</strong>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </>
                ) : (
                    <div className="not-found">Không tìm thấy công ty</div>
                )}
            </div>
        </div>
    );
}

export default CompanyDetail;
