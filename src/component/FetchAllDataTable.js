import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TTGWApi, {RequestConfig} from "../api/remoteServer";
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

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

const tableRef = React.createRef();

class FetchAllDataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { accountId: "", ether: "", result: "", msg: "", details: [] };

  componentDidMount() {
    this.onClickListTransaction();
  }

  onClickListTransaction = async (event) => {

   let requestURL = "/coexMsgLog/list/json/?sEcho=3&iColumns=11&iDisplayStart=40&iDisplayLength=10&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&mDataProp_0=coexlogId&mDataProp_1=coexlogMsgRefNo&mDataProp_2=coexlogMsgFunc&mDataProp_3=coexlogDocNo&mDataProp_4=coexlogDocRefNo&mDataProp_5=coexlogDocGroup&mDataProp_6=coexlogMsgVersion&mDataProp_7=coexlogMsgSender&mDataProp_8=coexlogMsgReceiver&mDataProp_9=coexlogProcessStatus&mDataProp_10=coexlogDtCreat";
 
    await TTGWApi.get(requestURL )
      .catch((err) => {
        console.log(`err: ${JSON.stringify(err)}`);
        this.setState({ result: err.message });
        return;
      })
      .then((response) => {
        if (response) {
          console.log(`topUp: ${JSON.stringify(response)}`);
          this.setState({
            details: response.data.aaData,
          });
        }
      });
  };

  render() {
    const { classes } = this.props;

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
                icons={tableIcons}
                title=""
                columns={[
                  { title: 'log id', field: 'modelID' },
                  { title: 'Ref No', field: 'coexlogMsgRefNo' },
                  { title: 'Function', field: 'coexlogMsgFunc' 
                    , lookup: { "issue":"issue", "cancel":"cancel", "replace":"replace" },},
                  { title: 'Doc No', field: 'coexlogDocNo' },
                  { title: 'Doc Ref No', field: 'coexlogDocRefNo' },
                  { title: 'Version', field: 'coexlogMsgVersion' },
                  { title: 'Sender', field: 'coexlogMsgSender' },
                  { title: 'Receiver', field: 'coexlogMsgReceiver' },
                  { title: 'Status', field: 'coexlogProcessStatus' 
                    , lookup: { "EXCEPTION":"EXCEPTION", "SUCCESS":"SUCCESS" }, },
                  { title: 'Created Date', field: 'coexlogDtCreate' },
                ]}
                onSearchChange = {() => {
                  //console.log(tableRef.current.DataManager.filteredData.length);
                  console.log("onSearchChange");
                }}
                onOrderChange = {() => {
                  //console.log(tableRef.current.DataManager.filteredData.length);
                  console.log("onOrderChange");
                }}
                onSelectionChange = {() => {
                  //console.log(tableRef.current.DataManager.filteredData.length);
                  console.log("onSelectionChange");
                }}
               data = {this.state.details}
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

export default withStyles(useStyles)(FetchAllDataTable);
