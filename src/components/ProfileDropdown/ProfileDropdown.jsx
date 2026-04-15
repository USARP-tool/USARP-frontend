import { useState } from "react";

import { ChevronDown, ChevronUp, LogOut, User } from "lucide-react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useAuth } from "../../hooks/useAuth";

const ProfileDropdown = ({ avatarUrl }) => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    handleLogout();
    navigate("/login");
  };

  const menuPaperStyles = {
    elevation: 0,
    sx: {
      overflow: "visible",
      mt: 1.5,
      borderRadius: "8px",
      border: "1px solid rgba(0,0,0,0.15)",
      boxShadow: "10px 10px 12px rgba(0,0,0,0.15)",
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ display: "flex", alignItems: "center", gap: "4px" }}
      >
        <Avatar
          alt="User Avatar"
          src={avatarUrl}
          sx={{
            bgcolor: "var(--th-bigbutton-background)",
            color: "var(--th-bigbutton-text)",
          }}
        >
          {user.avatar ? user.avatar : user.fullName?.substring(0, 2).toUpperCase()}
        </Avatar>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{ paper: menuPaperStyles }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/configurations/profile"
          sx={{
            color: "var(--th-color-text-dropdownmenu-option)",
            paddingY: "12px",
            textDecoration: "none",
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <User size={20} />
          </ListItemIcon>
          Meu perfil
        </MenuItem>

        <MenuItem
          onClick={handleSignOut}
          sx={{
            color: "var(--th-color-text-dropdownmenu-option)",
            paddingY: "12px",
            textDecoration: "none",
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <LogOut size={20} />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  );
};

ProfileDropdown.propTypes = {
  avatarUrl: PropTypes.string,
};

export default ProfileDropdown;
