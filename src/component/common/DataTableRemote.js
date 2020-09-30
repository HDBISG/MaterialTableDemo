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

class DataTableRemote extends React.Component {

  previiousPageNo = 0;

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

      data={ query => 
         new Promise((resolve, reject) => {

          let displayStart = this.getDisplayStart(query);
          
          var requestURL1 = "/" + this.props.moduleId + "/list/json/?sEcho=3" 
            + "&iDisplayStart=" + displayStart
            + "&iDisplayLength=" + query.pageSize
            + this.getSortParam(this.props.columns, query)
            + this.getQueryFieldParams(this.props.columns, query);
          
          let url = RequestConfig.baseURL + requestURL1;

          this.previiousPageNo = query.page;

          fetch(url)
            .then(response => response.json())
            .then(result => {
              resolve({
                data: result.aaData,
                page: ( (displayStart>0)?query.page:0 ),
                totalCount: result.iTotalDisplayRecords,
              })
            })
        })
    }
    options={{
      filtering: true,
      search: false,
      thirdSortClick: false,
      tableLayout: 'fixed'
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
      return 0;
    }
    return query.page * query.pageSize;
  }

  //&mDataProp_0=uriId&sSearch_0=uriId&sSearch_1=APPROVE
  getQueryFieldParams( columns, query ) {

    var idx = 0;
    let [sortFieldName, sortDirectction] = this.getSortFiledNameAndDirection( columns, query );
    var fieldParams = "";
    if( sortDirectction) {
      fieldParams = `&mDataProp_${idx}=${sortFieldName}`;
      idx++;
    }
    if( query.filters ) {
      query.filters.forEach( filter => 
        { fieldParams = fieldParams + `&mDataProp_${idx}=${filter.column.field}&sSearch_${idx}=${filter.value}`; idx++ });
    }
    fieldParams = fieldParams + `&iColumns=${idx}`;
    return fieldParams;
  }

  // &iSortCol_0=0&sSortDir_0=asc&iSortingCols=0
  getSortParam( columns, query ) {
    let [sortFieldName, sortDirectction] = this.getSortFiledNameAndDirection( columns, query )
    console.log('sortFieldName, sortDirectction = ${sortFieldName, sortDirectction}');
    if( sortDirectction) {
      return "&iSortCol_0=0&sSortDir_0="+ sortDirectction + "&iSortingCols=1";
    }
    // no sort
    return "&iSortCol_0=0&sSortDir_0=asc&iSortingCols=0";
  }

  getSortFiledNameAndDirection( columns, query ) {
    if( query.orderBy && query.orderBy.field) {
       return [query.orderBy.field, query.orderDirection];
    }
    return this.getDefaultSortFieldNameAndDirection( columns );
  }
  
  /**
   *  return [fieldname, 'desc']
   * @param {*} columns 
   */
  getDefaultSortFieldNameAndDirection( columns ) {
    var columnsTmp = columns;
    columnsTmp = columnsTmp.filter(function(column){
      return column.defaultSort != null && column.defaultSort != undefined; 
    });
    if( columnsTmp && columnsTmp.length > 0 ) {
      return [columnsTmp[0].field, columnsTmp[0].defaultSort ] ;
    }
    return null;
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

export default DataTableRemote;