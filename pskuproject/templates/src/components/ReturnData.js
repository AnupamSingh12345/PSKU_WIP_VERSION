import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TableloaderUpdate, loaderUpdate, PSKUFilterData, UpdatePSKU, updateListData, UpdateTargetWD } from '../actions/postAction';
import * as utils from "../utils/utils.js";
import { Select } from 'antd';
import { Table, Input, Button, Form, Icon, message } from 'antd';
import 'antd/dist/antd.css';
import "../App.css";
import Highlighter from 'react-highlight-words';
import { Spin } from 'antd';

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
        dataIndex: 'mkt_cntry_name',
        key: 'psku_id'
      },
      {
        title: 'CHANNEL',
        dataIndex: 'mkt_name',
        key: 'psku_id'
      },
      {
        title: 'CATEGORY',
        dataIndex: 'level1',
        key: 'psku_id'
      },
      {
        title: 'BRAND',
        dataIndex: 'brand',
        key: 'psku_id'
      },

      {
        title: 'SKU',
        dataIndex: 'prod_name',
        key: 'prod_name',
        ...this.getColumnSearchProps('prod_name'),
      },
      {
        title: 'VALUE SALES',
        dataIndex: 'sales_musd_amt',
        key: 'psku_id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.sales_musd_amt - b.sales_musd_amt,
      },
      {
        title: 'WD',
        dataIndex: 'wgt_dist_pct',
        key: 'psku_id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.wgt_dist_pct - b.wgt_dist_pct,
      },
      {
        title: 'ND',
        dataIndex: 'numrc_dist_pct',
        key: 'psku_id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.numrc_dist_pct - b.numrc_dist_pct,
      },
      {
        title: 'POWER',
        dataIndex: 'power_flag',
        key: 'psku_id'
      },
      {
        title: 'TARGET WD',
        dataIndex: 'target_wd',
        key: 'psku_id',
        editable: true,
      },

    ];

    this.state = {


      searchText: '',
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


  componentDidUpdate(prevProps) {
    if (prevProps.updatedData != this.props.updatedData) {
      this.props.PSKUFilterData(this.props.updatePostData);
    }

  }


  componentDidMount() {

    document.getElementsByClassName("ant-empty-description")[0].innerHTML = "No Data <br> Select Filters and Submit to Fetch Data.";

  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', utils.selectedId(selectedRows));
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });

    SelectedRow = [];
    SelectedRow.push(utils.selectedId(selectedRows))

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

    var post = {
      selectedRow: SelectedRow,
      power: this.state.power_flag,

    }

    if (SelectedRow[0].length === 0 || SelectedRow[0] === undefined) {
      message.warning('No SKU selected.');

    }
    else {

      this.props.UpdatePSKU(post);
      this.props.loaderUpdate();
      SelectedRow = [];

    }



  };

  onChangeFlag(e) {
    this.setState({
      power_flag: e,
    });

  }


  handleSave = row => {

    const newData = [...this.props.posts];
    const index = newData.findIndex(item => row.psku_id === item.psku_id);

    const item = newData[index];
    
    var post = {
      selectedRow: item['psku_id'],
      targetWD: row['target_wd'],

    }
    this.props.loaderUpdate();
    this.props.UpdateTargetWD(post);

  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    console.log("PSKU/WD data updated by user", this.props.DataAfterPSKUupdate)
    console.log("loader", this.props.loader)
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
    const hasSelectedPower = this.state.power_flag.length > 0 && selectedRowKeys.length > 0;




    return (
      <div>
        <div style={{ marginTop: 1.5 + 'em', marginLeft: 0.5 + 'em' }} >
          <Button className="reset-update-button" type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            Reset Selection
          </Button>

          <span className="reset-update-button" style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
          <Select
            showSearch
            style={{ width: 120, marginLeft: 8 }}
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
          <Button className="reset-update-button" style={{ marginLeft: 1 + 'em' }} type="primary" onClick={this.update_psku} disabled={!hasSelectedPower} loading={loading}>
            Update PSKU
          </Button>
          <Spin tip="Updating Data..." style={{ marginLeft: 2 + 'em' }} spinning={this.props.loader}>
          </Spin>
          <div>{this.props.updatedData}</div>


        </div>



        <div style={{ marginTop: 0.5 + 'em' }}>
          <Table className="test-class" components={components} rowClassName={() => 'editable-row'}
            bordered rowSelection={rowSelection} columns={columns} dataSource={this.props.posts} loading={this.props.tableLoader} />


        </div>

      </div>
    )
  }
}

const mapStatetoProps = (state) => {

  return {
    posts: state.data.data,
    updatePostData: state.UpdateListData,
    updatedData: state.data.dataupdatd,
    DataAfterPSKUupdate: state.data.dataAfterUpdate,
    loader: state.data.loader,
    tableLoader: state.data.tableLoader
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    PSKUFilterData, UpdatePSKU, updateListData, UpdateTargetWD, loaderUpdate, TableloaderUpdate
  }, dispatch);
}
export default connect(mapStatetoProps, mapDispatchToProps)(PSKU_Data);

