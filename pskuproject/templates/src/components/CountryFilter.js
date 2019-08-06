import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SourceFilterLoader, countryFilterData, SourceFilterData, CategoryFilterData, BrandFilterData } from '../actions/postAction';

import { Select,Spin } from 'antd';
import { updateList } from '../actions/postAction.js'

const Option = Select.Option;
class CountryFilter extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);

    }


    componentWillMount() {

        this.props.countryFilterData();
    }


    onChange(e) {

        const post = {
            SelectedCountry: e
        }

        this.props.SourceFilterData(post);

        this.props.updateList("country", e)
        this.props.updateList("category", "Select a Category")
        this.props.updateList("channel", "Select a Channel")
        this.props.updateList("brand", "Select a Brand")
        this.props.SourceFilterLoader();
    }

    render() {

        return (

            <Select
                showSearch
                style={{ width: 180, marginTop: 0.5 + 'em', marginLeft: 0.5 + 'em' }}

                placeholder="Select Country"
                optionFilterProp="children"
                defaultOpen={false}
                onChange={this.onChange}
                notFoundContent={this.props.CountryLoader ? <Spin size="small" tip="Loading Countries..."/> : "No Data"}

                value={this.props.updatelist['country']}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {this.props.posts.map((CountryList) => {
                    return (
                        <Option key={CountryList['mkt_cntry_name']}>{CountryList['mkt_cntry_name']}</Option>
                    )
                }

                )}
            </Select>

        )
    }
}



const mapStatetoProps = (state) => {

    return {
        posts: state.country.country,
        updatelist: state.update,
        CountryLoader: state.data.CountryLoader,
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        SourceFilterData, countryFilterData, CategoryFilterData, BrandFilterData, updateList, SourceFilterLoader
    }, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(CountryFilter);

