import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditCV, GetCV } from "../../service/CVService";
import { Card, Col, Row, Space, Tag } from "antd";
import Goback from "../../components/Goback/goback";
import { GetJob } from "../../service/JobService";

function DetailCV() {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchAndMarkRead = async () => {
      try {
        const [allCvs, allJobs] = await Promise.all([GetCV(), GetJob()]);
        const foundCv = allCvs.find(i => String(i.id) === id);
        const foundJob = allJobs.find(i => String(i.id) === String(foundCv.idJob));
        // await EditCV(foundCv.id, { statusRead: true });
        setCv(foundCv);
        setJob(foundJob);
      } catch (error) {
        console.error("Lỗi load DetailCV:", error);
      }
    };
    fetchAndMarkRead();
  }, [id, cv,job]);

  if (!cv || !job) {
    return <div>Không tìm thấy Cv</div>;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Row>
        <Col>
          <Goback />
        </Col>
      </Row>

      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Card title={`Ứng viên: ${cv.name}`}>
            <p>Ngày gửi: <strong>{cv.createAt}</strong></p>
            <p>Số điện thoại: <strong>{cv.phone}</strong></p>
            <p>Email: <strong>{cv.email}</strong></p>
            <p>Thành phố: <strong>{cv.city}</strong></p>
            <p>
              Giới thiệu bản thân:<br/>
              <strong>{cv.description}</strong>
            </p>
            <p>
              Link Project:<br/>
              <strong>{cv.linkProject}</strong>
            </p>
          </Card>
        </Col>

        <Col span={24}>
          <Card title={`Thông tin job: ${job.name}`}>
            <p>
              Tags:{" "}
              {job.tags.map((t, idx) => (
                <Tag key={idx} color="blue">
                  {t}
                </Tag>
              ))}
            </p>
            <p>Mức lương: <strong>{job.salary}$</strong></p>
            <p>
              Mô tả công việc:<br/>
              {job.description}
            </p>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}

export default DetailCV;