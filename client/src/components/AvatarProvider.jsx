import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NavLink } from "react-router-dom";

function AvatarProvider() {
  return (
    <NavLink to="/profile">
      <Avatar className="h-7 w-7">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>HD</AvatarFallback>
      </Avatar>
    </NavLink>
  );
}

export default AvatarProvider;
