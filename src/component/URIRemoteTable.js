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
  { title: 'Id', field: 'uriId', defaultSort:'desc', width: 100 },
  { title: 'AppsCode', field: 'appsCode', width: 100 },
  { title: 'Status', field: 'uriStatus' , width: 100
    , lookup: { "A":"Active", "I":"Inactive"},},
  { title: 'Type', field: 'uriType', width: 100 },
  { title: 'Path', field: 'uriDetails', width: 100},
  { title: 'Active Date', field: 'uriDtActive', width: 100 }
];

class URIRemoteTable  extends React.Component {
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
                moduleId ="uri"
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

export default withStyles(useStyles)(URIRemoteTable);
