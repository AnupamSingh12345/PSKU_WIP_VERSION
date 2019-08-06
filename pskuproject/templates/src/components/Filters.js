import React, { Component } from 'react';
import { Provider } from 'react-redux';
import CountryFilter from './CountryFilter';
import store from '.././store';
import SourceFilter from './SourceFilter';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import PSKU_Data from './ReturnData';
import GetData from './GetData';
import Header_Logo from './Header'
import { Layout } from 'antd';
import Footer_Logo from './Footer'

const { Header, Footer, Sider, Content } = Layout;
class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Layout>
                        <Header><Header_Logo /></Header>
                        <Content>
                            <CountryFilter />
                            <SourceFilter />
                            <CategoryFilter />
                            <BrandFilter />
                            <GetData />
                            <PSKU_Data />
                        </Content>


                    </Layout>
                    <Footer_Logo />
                </div>
            </Provider>

        );
    }
}



export default Filters;
