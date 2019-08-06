import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDetails } from '../actions/postAction';
class Header_Logo extends Component {
  render() {

    return (
      <div>
        <div className="ant-layout-header" style={{ marginTop: -0.4 + 'em', marginLeft: 25 + 'em' }}>PSKU SIMULATOR </div>
        <div style={{ marginTop: -50 + 'px', marginLeft: 75 + 'em', fontSize: 13 + 'px', float: 'right' }}>Welcome {this.props.userName}
          <a style={{ marginLeft: 10 + 'px' }} href="/.auth/logout">
            Logout
            </a>
        </div>
      </div>



    );
  }
}



const mapStatetoProps = (state) => {

  return {
    userName: state.userDetails.username
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserDetails
  }, dispatch);
}
export default connect(mapStatetoProps, mapDispatchToProps)(Header_Logo);