import React from "react";
import { Heart, LogIn, Search, ShoppingCart } from "lucide-react";
import { Input } from "./ui/input";
import { NavLink } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import AvatarProvider from "./AvatarProvider";
import { ModeToggle } from "./mode-toggle";
import { useRef } from "react";
function Header() {
  return (
    <header className="fixed h-20 border-b border-b-secondary top-0 left-0 right-0 px-10 flex items-center justify-between z-50 bg-primary-foreground dark:bg-[#000000e7] backdrop-blur-lg text-card-foreground">
      <img src="/logo-no-background.svg" className="logo h-7" alt="Logo" />
      <nav className="flex items-center gap-10">
        <div className="relative">
          <Search
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            aria-label="Search icon"
          />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-64"
            aria-label="Search products"
            ref={openSearch}
          />
        </div>
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <TooltipItem icon={<AvatarProvider />} label="Profile" />
            <TooltipItem
              icon={<ShoppingCart className="cursor-pointer" />}
              label="Cart"
            />
            <TooltipItem
              icon={<Heart className="cursor-pointer" />}
              label="Wishlist"
            />
            <TooltipItem
              icon={<LogIn className="cursor-pointer" />}
              label="Login"
            />
          </TooltipProvider>
          <div className="pl-20">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

function TooltipItem({ icon, label }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="rounded-full p-1 h-9 w-9 flex items-center justify-center"
          variant="ghost"
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent variant="outline">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default Header;
