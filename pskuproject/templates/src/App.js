import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import NormalLoginForm from './components/Home';
import ErrorPage from './components/ErrorPage';
import Filters from './components/Filters';
import Naviagtion from './components/Navigation';
import { Layout } from 'antd';
import Header_Logo from './components/Header'
import Footer_Logo from './components/Footer'

const { Header, Footer, Sider, Content } = Layout;
class App extends Component {
  render() {
    return (
      <div>
        {/* <Layout>
          <Header><Header_Logo /></Header>
          <Content> */}
        {/* <BrowserRouter>
      <div>
      <Naviagtion/>
      <Switch>
      <Route exact path="/" component={NormalLoginForm} />
      <Route path="/FirstPage" component={Filters}/>
      <Route component={ErrorPage} />
      </Switch>
      </div>
      </BrowserRouter> */}
        <Filters />
        {/* </Content>
         

        </Layout>
         <Footer_Logo /> */}

      </div>
    );
  }
}

export default App;
