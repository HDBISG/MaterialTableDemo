import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MaterialTableRemote from "./common/MaterialTableRemote";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

const columns = [
  { title: 'log id', field: 'coexlogId' },
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
  { title: 'Created Date', field: 'coexlogDtCreate', defaultSort: 'desc' },
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

              <MaterialTableRemote
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
