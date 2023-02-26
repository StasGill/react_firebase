import React from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../../assets/LogoIcon";

import "./header.css";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div
        className="header_container"
        onClick={() => navigate(`/`, { replace: true })}
      >
        <LogoIcon />
        <h1>Product WHITE</h1>
      </div>
    </div>
  );
};
