import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  center: {
    margin: "auto",
    width: "60%",
    padding: "10px",
  },
}));

export default function PortalAppBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItem = (item) => {
    setAnchorEl(null);
    props.onMenuChange(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = () => {
    const menuItemList = [
      "Fetch all data",
      "Remote 1",
      "Remote 2"
    ].map((item, index) => {
      return (
        <MenuItem
          key={`mi-${index}`}
          onClick={() => {
            handleMenuItem(`${index}`);
          }}
        >
          {item}
        </MenuItem>
      );
    });
    return menuItemList;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={(event) => {
              handleClick(event);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {menuItems()}
          </Menu>

          <Typography variant="h6" className={classes.title}>
            Material Table Demo
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
