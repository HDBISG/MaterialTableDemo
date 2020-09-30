import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

const tableIcons = {
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

const tableRef = React.createRef();

class MaterialTableRemote extends React.Component {

  previiousPageNo = 0;
  currentPageNo = 0;

  state = { accountId: "", ether: "", result: "", msg: "", details: [] };

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return <MaterialTable {...this.props} {...this.state}  
      icons={ tableIcons } 
      isLoading={this.state.isLoading}
      onSearchChange = {() => {
        console.log(`onSearchChange`);
      }}
      onOrderChange = {() => {
        console.log(`onOrderChange`);
      }}
      onChangePage = {() => {
        console.log(`onSelectionChange `);
      }}
      onChangeRowsPerPage = {() => {
        console.log(`onSelectionChange`);
      }}

      data={ query => //{
        //var props = this.props; // This line is important.
         new Promise((resolve, reject) => {
          var requestURL1 = "/" + this.props.moduleId + "/list/json/?sEcho=3&iColumns=1" 
            + "&iDisplayStart=" + this.getDisplayStart(query) 
            + "&iDisplayLength=" + query.pageSize
            + "&iSortCol_0=0&sSortDir_0=asc&iSortingCols=0&mDataProp_0=uriId";
          
          let url = RequestConfig.baseURL + requestURL1;
          console.log("this.props=" + this.props.moduleId );
          console.log("search=" + query.search );
          if ( query.orderBy ) {
            console.log(query.orderBy.field, query.orderDirection );
          }
          if ( query.filters && query.filters.length > 0 ) {
            console.log(query.filters[0].column.field, query.filters[0].value);
          }
          if ( query.filters && query.filters.length > 1 ) {
            console.log(query.filters[1].column.field, query.filters[1].value);
          }
          this.previiousPageNo = query.page;

          url += '&per_page=' + query.pageSize
          url += '&page=' + (query.page + 1)
          fetch(url)
            .then(response => response.json())
            .then(result => {
              resolve({
                data: result.aaData,
                page: this.currentPageNo,
                totalCount: result.iTotalDisplayRecords,
              })
            })
        })
      //}
    }
    options={{
      filtering: true,
      search: false
    }}
    actions={[
      {
        icon: () => <Refresh/>,
        tooltip: 'Refresh Data',
        isFreeAction: true,
        onClick: () => tableRef.current && tableRef.current.onQueryChange(),
      }
    ]}/>;
  }

  getDisplayStart( query ) {
    console.log(`previiousPageNo = ${this.previiousPageNo}  ${query.search} `   );
    if( this.previiousPageNo == query.page ) {
      this.currentPageNo = 0;
      return 0;
    }
    this.currentPageNo = query.page;
    return query.page * query.pageSize;
  }

  getQueryParam(query ) {
    
  }


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

}

export default MaterialTableRemote;