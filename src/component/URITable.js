import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
import TTGWApi, {RequestConfig} from "../api/remoteServer";
import CommonTable from "./common/CommonTable";
import Refresh from '@material-ui/icons/Refresh';


const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

const tableRef = React.createRef();


const columns = [
  { title: 'id', field: 'modelID' },
  { title: 'appsCode', field: 'appsCode' },
  { title: 'status', field: 'uriStatus' 
    , lookup: { "A":"Active", "I":"Inactive"},},
  { title: 'type', field: 'uriType' },
  { title: 'path', field: 'uriDetails' },
  { title: 'active date', field: 'uriDtActive' }
];

class ListTransactions extends CommonTable {
  constructor(props) {
    super(props);
  }

  state = { accountId: "",  result: "", msg: "", details: [] };

  componentDidMount() {

  }


  render() {
    const { classes } = this.props;

    console.log("super.tableIcons = " + super.getTableIcons() );

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          List Transactions
        </Typography>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
              <MaterialTable
                tableRef={tableRef}
                icons={ super.getTableIcons() }
                title=""
                columns= {columns}
                onSearchChange = {() => {
                  console.log(`onSearchChange`);
                }}
                onOrderChange = {() => {
                  console.log(`onOrderChange`);
                }}
                onSelectionChange = {() => {
                  console.log(`onSelectionChange`);
                }}
               // data = {this.state.details}
              data={query =>
                new Promise((resolve, reject) => {
                  var requestURL1 = "/uri/list/json/?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=asc&iSortingCols=0&mDataProp_0=uriId&iColumns=1";
                  
                  let url = RequestConfig.baseURL + requestURL1;
                  console.log("url=" + url );
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

                  url += '&per_page=' + query.pageSize
                  url += '&page=' + (query.page + 1)
                  fetch(url)
                    .then(response => response.json())
                    .then(result => {
                      resolve({
                        data: result.aaData,
                        page: 0,
                        totalCount: result.iTotalRecords,
                      })
                    })
                })
              }
              options={{
                filtering: true
              }}
              actions={[
                {
                  icon: () => <Refresh/>,
                  tooltip: 'Refresh Data',
                  isFreeAction: true,
                  onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                }
              ]}
              />

              </Grid>
            </Grid>
          </Grid>


        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(ListTransactions);
