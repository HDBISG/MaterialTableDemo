import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TTGWApi from "../api/ttgw";
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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

class ListTransactions extends React.Component {
  constructor(props) {
    super(props);

    this.accountIdRef = React.createRef();
    this.etherRef = React.createRef();
  }

  state = { accountId: "", ether: "", result: "", msg: "", details: [] };

  componentDidMount() {
    this.accountIdRef.current.focus();
  }

  onClickListTransaction = async (event) => {
    if (this.state.accountId === "") {
      this.accountIdRef.current.focus();
      return;
    }

    await TTGWApi.post("/listTransaction", {
      accountId: this.state.accountId,
    })
      .catch((err) => {
        console.log(`err: ${JSON.stringify(err)}`);
        this.setState({ result: err.message });
        return;
      })
      .then((response) => {
        if (response) {
          console.log(`topUp: ${JSON.stringify(response)}`);
          this.setState({
            result: response.data.status,
            msg: response.data.msg,
            details: response.data.details,
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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="accountId"
              name="accountId"
              label="AccountId"
              fullWidth
              variant="outlined"
              inputRef={this.accountIdRef}
              value={this.state.accountId}
              onChange={(event) =>
                this.setState({ accountId: event.target.value })
              }
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <Button
              variant="contained"
              onClick={() => {
                this.onClickListTransaction();
              }}
            >
              Search
            </Button>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
              <MaterialTable
                icons={tableIcons}
                title=""
                columns={[
                  { title: 'TimeStamp', field: 'timeStamp' },
                  { title: 'value', field: 'value' },
                  { title: 'gas', field: 'gas' },
                  { title: 'gas Price', field: 'gasPrice' },
                  { title: 'result', field: 'isError' },
                ]}
                data = {this.state.details}
                options={{
                  filtering: true
                }}
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
