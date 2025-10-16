import { useEffect, useState } from "react";
import { Get } from "../../utils/request";
import { Button, Col, Row } from "antd";
import { NavLink } from "react-router-dom";

function CompanyList() {
    const [Company, setCompany] = useState([]);
    const [showAll, setshowAll] = useState(false);
    useEffect(() => {
        const CallApi = async () => {
            const res = await Get('companies');
            setCompany(res);
        }
        CallApi();
    }, []);
    const visible = showAll ? Company : Company.slice(0, 2);
    return (
        <>
            <div className="companylist">
                <div className="companylist__item">
                    <Row gutter={[20, 20]}>
                        {visible.map(i => (
                            <Col
                                xs={24}
                                md={12}
                                lg={8} key={i.id}>

                                <NavLink style={{ color: '#333' }} to={`/company/${i.id}`}>
                                    <div className="companylist__item-object">
                                        <div className="object-name">
                                            Công ty: <strong>{i.companyName}</strong>
                                        </div>
                                        <div className="object-name">
                                            Số nhân sự: <strong>{i.quantityPeople ? i.quantityPeople : ''}</strong>
                                        </div>
                                        <div className="object-name">
                                            Địa chỉ: <strong>{i.address ? i.address : ''}</strong>
                                        </div>
                                    </div>
                                </NavLink>
                            </Col>
                        ))}
                    </Row>
                </div>
                {Company.length > 2 && (
                    <div className="companylist__button" style={{ marginTop: 16 }}>
                        <Button onClick={() => setshowAll(prev => !prev)}>
                            {showAll ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
}
export default CompanyList;