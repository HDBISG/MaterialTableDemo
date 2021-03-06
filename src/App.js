import React from 'react';
import Grid from "@material-ui/core/Grid";
import PortalAppBar from "./navigation/PortalAppBar";
import PortalNavigation from "./navigation/PortalNavigation";
import BaseAppBar from "./navigation/BaseAppBar";
import { withStyles } from "@material-ui/core/styles";
import './App.css';
import CoTable from './component/CoTable';
import CountryTable from './component/CountryTable';
import CoRemoteTable from './component/CoRemoteTable';
import URIRemoteTable from './component/URIRemoteTable';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  alignment: {
    textAlign: "center",
  },
});

class App extends React.Component {
  state = { option: "0" };

  onOption = (newOption) => {
    this.setState({ option: newOption });
  };

  options = [
    <CoTable />,
    <CountryTable />,
    <CoRemoteTable />,
    <URIRemoteTable />,
  ];
  getOption(option) {
    return this.options[parseInt(option)];
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} sm={12}>
            <PortalAppBar onMenuChange={this.onOption} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <PortalNavigation
              navOption={this.state.option}
              onOptionChange={this.onOption}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container className={classes.root} spacing={1}>
              <Grid item xs={1} sm={1}></Grid>
              <Grid item xs={10} sm={10}>
                {this.getOption(this.state.option)}
              </Grid>
              <Grid item xs={1} sm={1}></Grid>
            </Grid>
          </Grid>
          <Grid>
            <Grid item xs={12} sm={12}>
            <br/>&nbsp;
            <br/>&nbsp;
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <BaseAppBar />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(App);
