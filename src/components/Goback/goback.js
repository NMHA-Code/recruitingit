import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Goback(){
    const navigate = useNavigate();

    return(
        <>
        <div className="goback">
        <Button onClick={() => {navigate(-1)}}>
            Trở lại
        </Button>
        </div>
        </>
    )
}
export default Goback;