import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PSKUFilterData, UpdatePSKU, updateListData, UpdateTargetWD } from '../actions/postAction';
import * as utils from "../utils/utils.js";
import { Select } from 'antd';
import { Table, Input, Button, Form } from 'antd';
import 'antd/dist/antd.css';
import "../App.css"

const Option = Select.Option;



const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    console.log("table props=",this.props)
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: false,
              
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
            children
          )}
      </td>
    );
  }
}



// Table
var SelectedRow = [];


const Power_Value = ['YES', 'NO'];
class PSKU_Data extends Component {
  constructor(props) {
    super();
    this.columns = [
      {
        title: 'COUNTRY',
        dataIndex: 'MKT_CNTRY_NAME',
        key: 'PSKU_ID'
      },
      {
        title: 'CHANNEL',
        dataIndex: 'MKT_NAME',
        key: 'PSKU_ID'
      },
      {
        title: 'CATEGORY',
        dataIndex: 'LEVEL1',
        key: 'PSKU_ID'
      },
      {
        title: 'BRAND',
        dataIndex: 'LEVEL3',
        key: 'PSKU_ID'
      },

      {
        title: 'SKU',
        dataIndex: 'PROD_NAME',
        key: 'PSKU_ID'
      },
      {
        title: 'VALUE SALES',
        dataIndex: 'SALES_MUSD_AMT',
        key: 'PSKU_ID',
        defaultSortOrder: 'descend',
    sorter: (a, b) => a.SALES_MUSD_AMT - b.SALES_MUSD_AMT,
      },
      {
        title: 'WD',
        dataIndex: 'WGT_DIST_PCT',
        key: 'PSKU_ID',
        defaultSortOrder: 'descend',
    sorter: (a, b) => a.WGT_DIST_PCT - b.WGT_DIST_PCT,
      },
      {
        title: 'ND',
        dataIndex: 'NUMRC_DIST_PCT',
        key: 'PSKU_ID',
        defaultSortOrder: 'descend',
    sorter: (a, b) => a.NUMRC_DIST_PCT - b.NUMRC_DIST_PCT,
      },
      {
        title: 'POWER',
        dataIndex: 'POWER_OR_NOT',
        key: 'PSKU_ID'
      },
      {
        title: 'TARGET WD',
        dataIndex: 'TARGET_WD',
        key: 'PSKU_ID',
        editable: true,
      },

    ];

    this.state = {
      table_data: [],
      selectedRowKeys: [],
      selectedRowPost: [],
      loading: false,
      updatelistState: [],
      power_flag: "",

    }
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onChangeFlag = this.onChangeFlag.bind(this);

  }
 
  componentWillMount() {
    var post = {
      SelectedCountry: "",
      SelectedChannel: "",
      SelectedCategory: "",
      SelectedBrand: "",
    }
    this.props.PSKUFilterData(post);
  }
  componentDidUpdate(prevProps)
  {
    if(prevProps.updatedData!=this.props.updatedData)
    {
      this.props.PSKUFilterData(this.props.updatePostData);
    }
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', utils.selectedId(selectedRows));
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
    SelectedRow = [];
    SelectedRow.push(utils.selectedId(selectedRows))
    console.log(SelectedRow)
  };

  start = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };
  update_psku = (selectedRows) => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
      var post = {
        selectedRow: SelectedRow,
        power: this.state.power_flag,

      }
      this.props.UpdatePSKU(post);
    //  this.props.PSKUFilterData(this.props.updatePostData);
    }, 1000);
    this.props.updateListData(this.props.updatePostData);
   

  };

  onChangeFlag(e) {
    this.setState({
      power_flag: e,
    });
  }
  handleSave = row => {
    
    const newData = [...this.props.posts];
    const index = newData.findIndex(item => row.PSKU_ID === item.PSKU_ID);
    
    const item = newData[index];
    console.log("handle save row=",row['TARGET_WD'])
    console.log("handle save psku=",item['PSKU_ID'])
   
    var post = {
      selectedRow: item['PSKU_ID'],
      targetWD: row['TARGET_WD'],

    }
    this.props.UpdateTargetWD(post);
    
  };
  render() {
    const { loading, selectedRowKeys } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }} >
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            Reset Selection
          </Button>

          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
          <Select
            showSearch
            style={{ width: 180, marginLeft: 8 }}
            placeholder="Select Flag"
            optionFilterProp="children"
            defaultOpen={false}
            onChange={this.onChangeFlag}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {Power_Value.map(Power_Value => (
              <Option key={Power_Value}>{Power_Value}</Option>
            ))}
          </Select>
          <Button style={{ marginLeft: 8 }} type="primary" onClick={this.update_psku} disabled={!hasSelected} loading={loading}>
            Update
          </Button>
        </div>
        <div >
          <Table className="test-class" components={components} rowClassName={() => 'editable-row'}
            bordered rowSelection={rowSelection} columns={columns} dataSource={this.props.posts} />


        </div>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  console.log("ANUPAM STATE=",state.data.dataupdatd)
  return {
    posts: state.data.data,
  updatePostData: state.UpdateListData,
  updatedData: state.data.dataupdatd
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    PSKUFilterData, UpdatePSKU, updateListData, UpdateTargetWD
  }, dispatch);
}
export default connect(mapStatetoProps, mapDispatchToProps)(PSKU_Data);

