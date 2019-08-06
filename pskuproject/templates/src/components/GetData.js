import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd'
import {TableloaderUpdate, PSKUFilterData, updateList, updateListData, SourceFilterData, CategoryFilterData } from '../actions/postAction'


class GetData extends Component {

    handleClick = () => {


        this.props.SourceFilterData("");
        this.props.CategoryFilterData("");
        this.props.PSKUFilterData(this.props.posts);
        this.props.updateList("category", "Select a Category")
        this.props.updateList("channel", "Select a Channel")
        this.props.updateList("brand", "Select a Brand")
        this.props.updateList("country", "Select a Country")
        this.props.updateListData("category", this.props.posts['category'])
        this.props.updateListData("channel", this.props.posts['channel'])
        this.props.updateListData("brand", this.props.posts['brand'])
        this.props.updateListData("country", this.props.posts['country'])
        this.props.TableloaderUpdate();
    }

    render() {
        var isEnabled = false;

        if (this.props.posts['brand'] != "Select a Brand" || this.props.posts['brand'] == "") {

            isEnabled = true;
        }




        return (
            <div style={{ marginLeft: 60 + 'em', marginTop: -2.3 + 'em' }}>
                <Button type="primary" onClick={this.handleClick} disabled={!isEnabled}>
                    Submit
          </Button>
            </div>
        )
    }
}


const mapStatetoProps = (state) => {
    return {
        posts: state.update,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        PSKUFilterData, updateList, updateListData, SourceFilterData, CategoryFilterData,TableloaderUpdate
    }, dispatch);
}
export default connect(mapStatetoProps, mapDispatchToProps)(GetData);

