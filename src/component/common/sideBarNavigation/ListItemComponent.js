import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import DescriptionIcon from "@material-ui/icons/Description";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import ArchiveIcon from "@material-ui/icons/Archive";
import HomeIcon from "@material-ui/icons/Home";
import DraftsIcon from "@material-ui/icons/Drafts";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { NavLink } from "react-router-dom";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PrintIcon from "@material-ui/icons/Print";
import InfoIcon from "@material-ui/icons/Info";
import Badge from "@material-ui/core/Badge";
import HistoryIcon from "@material-ui/icons/History";
export default function ListItemComponent(props) {
  function icon() {
    if (props.primary === "Drafts") {
      return <DraftsIcon />;
    }

    if (props.primary === "Pending") {
      return <QueryBuilderIcon />;
    }

    if (props.primary === "Manage Document Category") {
      return <DescriptionIcon />;
    }

    if (props.primary === props.section + " Documents") {
      return <FolderSharedIcon />;
    }

    if (props.primary === "History") {
      return <HistoryIcon />;
    }

    if (props.primary === "New") {
      return <AddBoxIcon />;
    }

    if (props.primary === "Home") {
      return <HomeIcon />;
    }

    if (props.primary === "User Management") {
      return <SupervisorAccountIcon />;
    }

    if (props.primary === "Generate Reports") {
      return <PrintIcon />;
    }

    if (props.primary === "About") {
      return <InfoIcon />;
    }
  }

  function route() {
    if (props.primary === "Drafts") {
      return "/drafts";
    }
    if (props.primary === "Pending") {
      return "/pending";
    }

    if (props.primary === "Manage Document Category") {
      return "/doc_category";
    }

    if (props.primary === props.section + " Documents") {
      return "/sectionDocuments";
    }

    if (props.primary === "History") {
      return "/processedDocuments";
    }

    if (props.primary === "New") {
      return "/addDocument";
    }

    if (props.primary === "Home") {
      return "/";
    }

    if (props.primary === "Generate Reports") {
      return "/reports";
    }

    if (props.primary === "About") {
      return "/about";
    }
  }

  const activeStyle = {
    color: "#2196F3",
    fontWeight: "bold",
    textDecoration: "underline",
  };
  return (
    <NavLink
      activeStyle={activeStyle}
      to={route()}
      exact
      style={{ textDecoration: "none", color: "#000" }}
    >
      <ListItem
        button
        className={props.className}
        title={"Click to explore " + props.primary}
      >
        <ListItemIcon>{icon()}</ListItemIcon>
        <ListItemText
          primary={
            props.primary === "Pending" ? (
              <>
                {parseInt(props.pending) > 0 && (
                  <Badge badgeContent={props.pending} color="secondary">
                    {props.primary}
                  </Badge>
                )}
                {parseInt(props.pending) === 0 && props.primary}
              </>
            ) : (
              props.primary
            )
          }
        />
      </ListItem>
    </NavLink>
  );
}
