import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddIcon from "@material-ui/icons/NoteAdd";
import TopUpIcon from "@material-ui/icons/MonetizationOn";
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/Description";
import ViewListIcon from '@material-ui/icons/ViewList';
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    backgroundColor: "light-grey",
    margin: "auto",
    width: "60%",
    padding: "10px",
  },
});

class PortalNavigation extends React.Component {
  state = { option: "0" };

  onBntClick = (event, newValue) => {
    this.setState({ option: newValue });
    this.props.onOptionChange(newValue);
  };

  navigationActions = [
    { label: "CO", icon: <FolderIcon /> },
    { label: "Country", icon: <FolderIcon /> },
    { label: "URI", icon: <FolderIcon /> },
  ];

  renderNavActions = () => {
    return this.navigationActions.map((item, index) => {
      return (
        <BottomNavigationAction
          key={`nav-${index}`}
          label={item.label}
          value={`${index}`}
          icon={item.icon}
        />
      );
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <BottomNavigation
        value={this.props.navOption}
        onChange={(event, newValue) => {
          this.onBntClick(event, newValue);
        }}
        showLabels
        className={classes.root}
      >
        {this.renderNavActions()}
      </BottomNavigation>
    );
  }
}
export default withStyles(useStyles)(PortalNavigation);
