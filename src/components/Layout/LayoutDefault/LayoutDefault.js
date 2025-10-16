    import { Layout } from 'antd';
    import Headers from '../Header/Header';
    import Footers from '../Footer/Footer';
    import Main from '../Main/Main';
    import '../../../constants/Style/Default.scss'
    const { Header, Content, Footer } = Layout;
    function LayoutDefault() {
        return (
            <>
                <Layout>
                    <Header style={{ backgroundColor: 'transparent' }}>
                        <div className='container'>
                            <Headers />
                        </div>
                    </Header>
                    <Content style={{backgroundColor: 'white'}}>
                        <Main />
                    </Content>
                    <Footer>
                        <div className='container'>
                            <Footers />
                        </div>
                    </Footer>
                </Layout>
            </>
        )
    }
    export default LayoutDefault;