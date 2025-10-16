import {useRoutes} from 'react-router-dom';
import {router} from '../../router/router';
export const AllRouter = () => {
    const routers = useRoutes(router);
    return(
        <>
        {routers}
        </>
    )
}