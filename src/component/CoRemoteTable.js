import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import DataTableRemote from "./common/DataTableRemote";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

const columns = [
  { title: 'log id', field: 'coexlogId', width: 100 },
  { title: 'Ref No', field: 'coexlogMsgRefNo', width: 100 },
  { title: 'Function', field: 'coexlogMsgFunc' , width: 100
    , lookup: { "issue":"issue", "cancel":"cancel", "replace":"replace" },},
  { title: 'Doc No', field: 'coexlogDocNo', width: 100 },
  { title: 'Doc Ref No', field: 'coexlogDocRefNo', width: 100 },
  { title: 'Version', field: 'coexlogMsgVersion', width: 100 },
  { title: 'Sender', field: 'coexlogMsgSender', width: 100 },
  { title: 'Receiver', field: 'coexlogMsgReceiver', width: 100 },
  { title: 'Status', field: 'coexlogProcessStatus' , width: 100
    , lookup: { "EXCEPTION":"EXCEPTION", "SUCCESS":"SUCCESS", width: 100 }, },
  { title: 'Created Date', field: 'coexlogDtCreate', defaultSort: 'desc', width: 100 },
];

class CoRemoteTable  extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { accountId: "",  result: "", msg: "", details: [] };

  componentDidMount() {

  }

  render() {

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          List URI
        </Typography>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>

              <DataTableRemote
                moduleId ="coexMsgLog"
                columns= {columns}
              />

              </Grid>
            </Grid>
          </Grid>


        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(CoRemoteTable);
