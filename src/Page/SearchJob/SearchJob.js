import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { GetJob } from "../../service/JobService";
import { GetCompany } from "../../service/CompanyService";
import { Card, Col, Row, Space, Tag } from "antd";

function Search() {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);

  const citySearch = searchParams.get("city") || "";
  const tagSearch = searchParams.get("tag") || "";

  useEffect(() => {
    async function fetchData() {
      const jobList = await GetJob();
      const companyList = await GetCompany();

      if (companyList) {
        setCompanies(companyList);
      }

      if (jobList) {
        const filtered = jobList.filter(job => {
          const matchCity = citySearch
            ? job.city?.includes(citySearch)
            : true;
          const matchTag = tagSearch
            ? job.tags?.includes(tagSearch)
            : true;
          return matchCity && matchTag && job.status;
        });
        setJobs(filtered);
      }
    }
    fetchData();
  }, [citySearch, tagSearch]);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Row>
        <Col span={24}>
          Kết quả tìm kiếm: {' '}
          <Tag color="blue">{citySearch}</Tag>
          <Tag color="blue">{tagSearch}</Tag>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {jobs.map(job => {
          const company = companies.find(c => c.id === job.idCompany);

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={job.id}>
              <Card
                title={
                  <NavLink to={`/jobs/${job.id}`}>
                    <strong>{job.name}</strong>
                  </NavLink>
                }
              >
                <p>
                  Ngôn ngữ:{" "}
                  {job.tags?.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </p>
                <p>
                  Thành phố:{" "}
                  {job.city?.map(city => (
                    <Tag color="warning" key={city}>
                      {city}
                    </Tag>
                  ))}
                </p>
                <p>
                  Lương: <strong>{job.salary}$</strong>
                </p>
                <p>
                  Tên công ty:{" "}
                  <strong>{company?.companyName || "Chưa có"}</strong>
                </p>
                <p>
                  Ngày tạo:{" "}
                  <strong>
                    {job.createAt}
                  </strong>
                </p>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Space>
  );
}

export default Search;