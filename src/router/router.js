import LayoutAdmin from "../components/Layout/LayoutAdmin/LayoutAdmin";
import LayoutDefault from "../components/Layout/LayoutDefault/LayoutDefault";
import { PrivateRouters } from "../components/PrivateRouter/privaterouter";
import CompanyDetail from "../Page/CompanyDetail/CompanyDetail";
import CreateJob from "../Page/CreateJob/CreateJob";
import CVManage from "../Page/CVManage/Cvmanage";
import Dashboard from "../Page/Dashboard/dashboard";
import DetailCV from "../Page/DetailCV/DetailCV";
import DetailJobAdmin from "../Page/DetailJobById/DetailJobAdmin";
import Home from "../Page/Home/home";
import InfoCompany from "../Page/InfoCompany/InfoCompany";
import JobDetail from "../Page/JobDetail/jobdetail";
import JobManage from "../Page/JobManage/JobManage";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import Search from "../Page/SearchJob/SearchJob";

export const router = [
    {
        path: '/',
        element: <LayoutDefault/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path:'home',
                element: <Home/>
            },
            {
                path: 'company/:id',
                element: <CompanyDetail/>
            },
            {
                path: 'jobs/:id',
                element: <JobDetail/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },{
                path: 'search',
                element: <Search/>
            }
        ]
    },
    {
        element: <PrivateRouters/>,
        children: [
            {
                element: <LayoutAdmin/>,
                children: [
                    {
                        path: 'admin',
                        element: <Dashboard/>
                    },
                    {
                        path: 'info-company',
                        element: <InfoCompany/>
                    },
                    {
                        path: 'job-manage',
                        element: <JobManage/>
                    },
                    {
                        path: 'create-job',
                        element: <CreateJob/>
                    },
                    {
                        path: 'detail-job/:id',
                        element: <DetailJobAdmin/>
                    },
                    {
                        path: 'cv-manage',
                        element: <CVManage/>
                    },
                    {
                        path: 'detail-cv/:id',
                        element: <DetailCV/>
                    }
                ]
            }
        ]
    }
];