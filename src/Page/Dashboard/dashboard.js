import { Card, Col, Row } from "antd";
import { getCookie } from "../../helpers/Cookie/Cookie";
import { useEffect, useState } from "react";
import { GetJob } from "../../service/JobService";
import { GetCV } from "../../service/CVService";
import { GetCompany } from "../../service/CompanyService";

function Dashboard() {
    const idCompany = getCookie('id');
    const [dataCompany, setdataCompany] = useState({});
    const [data, setData] = useState({
        total: 0,
        statusTrue: 0,
        statusFalse: 0
    });
    const [datacv, setDatacv] = useState({
        total: 0,
        statusTrue: 0,
        statusFalse: 0
    });

    const filters = (list, id) => {
        return list.filter(i => String(i.idCompany) === id);
    }
    useEffect(() => {
        const fetchAPI = async () => {
            const [rawjob, rawcv, rawcompany] = await Promise.all([
                GetJob(),
                GetCV(),
                GetCompany()
            ])
            const jobs = filters(rawjob, idCompany);
            const cvs = filters(rawcv, idCompany);
            const company = rawcompany.find(i => String(i.id) === idCompany);
            setdataCompany(company);
            setDatacv({
                total: cvs.length,
                statusTrue: cvs.filter(j => j.statusRead).length,
                statusFalse: cvs.filter(j => !j.statusRead).length
    
            })
            setData({
                total: jobs.length,
                statusTrue: jobs.filter(j => j.status).length,
                statusFalse: jobs.filter(j => !j.status).length
            });
        }
        fetchAPI();
    }, [idCompany]);
    return (
        <>
            <div className="dashboard">
                <h2>Tổng quan</h2>
                <Row gutter={[20,20]}>
                    <Col xs={24} md={12} lg={8}>
                        <Card title="Job">
                            <p>Số lượng job: <strong>{data.total}</strong></p>
                            <p>Job đang bật: <strong>{data.statusTrue}</strong></p>
                            <p>Job đang tắt: <strong>{data.statusFalse}</strong></p>
                        </Card>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Card title="CV">
                            <p>Số lượng CV: <strong>{datacv.total}</strong></p>
                            <p>CV đã đọc: <strong>{datacv.statusTrue}</strong></p>
                            <p>CV chưa đọc: <strong>{datacv.statusFalse}</strong></p>
                        </Card>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Card title="Thông tin công ti">
                            <p>Tên công ti: <strong>{dataCompany.companyName}</strong></p>
                            <p>Email: <strong>{dataCompany.email}</strong></p>
                            <p>Số điện thoại: <strong>{dataCompany ? dataCompany.phone : ''}</strong></p>
                            <p>Số nhânn viên: <strong>{dataCompany ? dataCompany.quantityPeople : ''}</strong></p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Dashboard;