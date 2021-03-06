import React from "react";
import TTGWApi, {RequestConfig} from "../../api/remoteServer";
import MaterialTable from 'material-table';

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Refresh from '@material-ui/icons/Refresh';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { accountId: "", ether: "", result: "", msg: "", details: [], isLoading: true };

  tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Refresh: forwardRef((props, ref) => <Refresh {...props} ref={ref} />)
  };
  
  
  tableRef = React.createRef();
  
  componentDidMount() {
    console.log(`begin  componentDidMount ${this}`);
    this.onClickListTransaction();
    console.log(` end componentDidMount ${this}`);
  }

  onClickListTransaction = async (event) => {

   let requestURL = this.props.moduleId + "/list/json/?sEcho=3&iColumns=0&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=asc&iSortingCols=0";
 
    TTGWApi.get(requestURL )
      .catch((err) => {
        console.log(`err: ${JSON.stringify(err)}`);
        this.setState({ result: "" });
      })
      .then((response) => {
        if (response) {
          this.setState({
            details: response.data.aaData,
            isLoading : false
          });
        }
      });
  };

  render() {
    return <MaterialTable {...this.props} {...this.state}  
        icons={ this.tableIcons } 
        title={ this.props.title||""}
        isLoading={this.state.isLoading}
        data = {this.state.details}
        options={{
          filtering: true,
          tableLayout: 'fixed'
        }}
      />;
  }

}

export default DataTable;
