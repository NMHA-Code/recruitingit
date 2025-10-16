import { useEffect, useState } from "react";
import { Get } from "../../utils/request";
import { Space, Tag } from "antd";

function SkillList() {
    const [Tags, setTags] = useState([]);
    useEffect(() => {
        const CallApi = async () => {
            const res = await Get('tags');
            setTags(res);
        }
        CallApi();
    }, []);
    return (
        <>
            <Space wrap size={[6, 6]}>
                {Tags.map(i => (
                    <Tag key={i.key} color="blue">
                        {i.value}
                    </Tag>
                ))}
            </Space>

        </>
    )
}
export default SkillList;