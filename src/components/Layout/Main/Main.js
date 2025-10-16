import  {Outlet} from 'react-router-dom';
function Main(){
    return(
        <>
        <div className="container">
            <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
                <Outlet/>
            </div>
        </div>
        </>
    )
}
export default Main;