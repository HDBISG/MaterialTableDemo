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
  { title: 'id', field: 'modelID' },
  { title: 'appsCode', field: 'appsCode' },
  { title: 'status', field: 'uriStatus' 
    , lookup: { "A":"Active", "I":"Inactive"},},
  { title: 'type', field: 'uriType' },
  { title: 'path', field: 'uriDetails' },
  { title: 'active date', field: 'uriDtActive' }
];

class ListTransactions  extends React.Component {
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

export default withStyles(useStyles)(ListTransactions);
