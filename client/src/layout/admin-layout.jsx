import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "../components/mode-toggle";

export function Layout() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsSheetOpen(false);
  }, [location.pathname]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavLink to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <div className="h-6">
                <svg
                  width="auto"
                  height="auto"
                  viewBox="0 0 531 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M74.875 5.6875L37.6875 95.875L0.75 5.6875H30.125L37.9375 32.3125L46.5625 5.6875H74.875ZM102.062 28.6875V91H78.6875V28.6875H102.062ZM90.4375 0.875C93.6042 0.875 96.3333 2 98.625 4.25C100.958 6.45833 102.125 9.08333 102.125 12.125C102.125 15.375 101.021 18.0417 98.8125 20.125C96.6458 22.2083 93.8542 23.25 90.4375 23.25C87.0208 23.25 84.2083 22.2083 82 20.125C79.8333 18.0417 78.75 15.375 78.75 12.125C78.75 9.08333 79.8958 6.45833 82.1875 4.25C84.5208 2 87.2708 0.875 90.4375 0.875ZM137.812 5.6875V56.75C137.812 65.0417 140.792 69.1875 146.75 69.1875C149.292 69.1875 151.438 68.3333 153.188 66.625C154.979 64.875 155.875 62.7708 155.875 60.3125C155.875 57.7708 155.042 55.6458 153.375 53.9375C151.708 52.1875 149.667 51.3125 147.25 51.3125C145.542 51.3125 143.583 52.0625 141.375 53.5625V27.8125C144.125 27.5625 146.208 27.4375 147.625 27.4375C156.417 27.4375 163.938 30.6042 170.188 36.9375C176.479 43.2708 179.625 50.8958 179.625 59.8125C179.625 68.9375 176.438 76.625 170.062 82.875C163.688 89.125 155.854 92.25 146.562 92.25C141.896 92.25 137.333 91.2292 132.875 89.1875C128.458 87.1458 124.812 84.3958 121.938 80.9375C116.938 74.9375 114.438 67.1667 114.438 57.625V5.6875H137.812ZM251.188 63.625H215.75C215.208 61.8333 214.938 60.1875 214.938 58.6875C214.938 56.6042 215.312 54.5625 216.062 52.5625H227.938C227.104 47.9375 224.5 45.625 220.125 45.625C217.208 45.625 214.833 46.875 213 49.375C211.167 51.8333 210.25 55 210.25 58.875C210.25 62.9167 211.125 66.1875 212.875 68.6875C214.667 71.1875 217 72.4375 219.875 72.4375C222.208 72.4375 224.458 71.2708 226.625 68.9375L239.938 84.9375C233.729 89.8125 226.833 92.25 219.25 92.25C210 92.25 202.229 89.1458 195.938 82.9375C189.646 76.7292 186.5 69.0417 186.5 59.875C186.5 50.75 189.667 43.0417 196 36.75C202.375 30.4583 210.188 27.3125 219.438 27.3125C228.479 27.3125 236.062 30.3958 242.188 36.5625C248.354 42.6875 251.438 50.25 251.438 59.25C251.438 60.1667 251.354 61.625 251.188 63.625ZM302.75 5.3125V29.625C300.917 29 299.5 28.6875 298.5 28.6875C296.583 28.6875 294.938 29.3958 293.562 30.8125C292.188 32.2292 291.5 33.9375 291.5 35.9375C291.5 37.6458 292.25 39.8125 293.75 42.4375L295.688 45.8125C299.188 51.8958 300.938 57.7708 300.938 63.4375C300.938 71.7292 297.979 78.75 292.062 84.5C286.188 90.25 279 93.125 270.5 93.125C266.417 93.125 262.375 92.1875 258.375 90.3125V65.625C260.792 67.1667 262.938 67.9375 264.812 67.9375C267.021 67.9375 268.854 67.3125 270.312 66.0625C271.812 64.7708 272.562 63.1667 272.562 61.25C272.562 60 271.375 57.2708 269 53.0625C265.208 46.3958 263.312 39.7292 263.312 33.0625C263.312 25.0208 266.167 18.1042 271.875 12.3125C277.625 6.47917 284.479 3.5625 292.438 3.5625C295.938 3.5625 299.375 4.14583 302.75 5.3125ZM334.75 5.6875V29.5625H345.25V54.25H334.75C334.75 59.2083 335.521 62.625 337.062 64.5C338.646 66.375 341.521 67.3125 345.688 67.3125V91.875C344.479 91.9167 343.583 91.9375 343 91.9375C337.708 91.9375 332.708 90.7083 328 88.25C323.333 85.7917 319.583 82.4583 316.75 78.25C313.167 72.875 311.375 65.75 311.375 56.875V5.6875H334.75ZM386.375 27.375C395.208 27.375 402.771 30.5625 409.062 36.9375C415.396 43.2708 418.562 50.875 418.562 59.75C418.562 68.75 415.354 76.4167 408.938 82.75C402.562 89.0833 394.854 92.25 385.812 92.25C376.771 92.25 369.042 89.0833 362.625 82.75C356.208 76.375 353 68.7083 353 59.75C353 50.625 356.208 42.9583 362.625 36.75C369.042 30.5 376.958 27.375 386.375 27.375ZM385.75 50.4375C383.25 50.4375 381.125 51.3542 379.375 53.1875C377.625 54.9792 376.75 57.1875 376.75 59.8125C376.75 62.3958 377.625 64.6042 379.375 66.4375C381.167 68.2708 383.292 69.1875 385.75 69.1875C388.25 69.1875 390.375 68.2708 392.125 66.4375C393.917 64.6042 394.812 62.3958 394.812 59.8125C394.812 57.1875 393.938 54.9792 392.188 53.1875C390.438 51.3542 388.292 50.4375 385.75 50.4375ZM462.5 28.0625V53.0625C460.875 52.1458 459.396 51.6875 458.062 51.6875C453.812 51.6875 451.688 54.9375 451.688 61.4375V91H428.312V56.9375C428.312 47.9375 430.771 40.7708 435.688 35.4375C440.604 30.0625 447.167 27.375 455.375 27.375C457.208 27.375 459.583 27.6042 462.5 28.0625ZM530.688 63.625H495.25C494.708 61.8333 494.438 60.1875 494.438 58.6875C494.438 56.6042 494.812 54.5625 495.562 52.5625H507.438C506.604 47.9375 504 45.625 499.625 45.625C496.708 45.625 494.333 46.875 492.5 49.375C490.667 51.8333 489.75 55 489.75 58.875C489.75 62.9167 490.625 66.1875 492.375 68.6875C494.167 71.1875 496.5 72.4375 499.375 72.4375C501.708 72.4375 503.958 71.2708 506.125 68.9375L519.438 84.9375C513.229 89.8125 506.333 92.25 498.75 92.25C489.5 92.25 481.729 89.1458 475.438 82.9375C469.146 76.7292 466 69.0417 466 59.875C466 50.75 469.167 43.0417 475.5 36.75C481.875 30.4583 489.688 27.3125 498.938 27.3125C507.979 27.3125 515.562 30.3958 521.688 36.5625C527.854 42.6875 530.938 50.25 530.938 59.25C530.938 60.1667 530.854 61.625 530.688 63.625Z"
                    fill="black"
                  />
                </svg>
              </div>
            </NavLink>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                  }`
                }
              >
                <Home className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                  }`
                }
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </NavLink>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                  }`
                }
              >
                <Package className="h-4 w-4" />
                Products
              </NavLink>
              <NavLink
                to="/admin/customers"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                  }`
                }
              >
                <Users className="h-4 w-4" />
                Customers
              </NavLink>
              <NavLink
                to="/admin/analytics"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                  }`
                }
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </NavLink>
            </nav>
          </div>
          {/* Adding into bottom */}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to="/admin"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Vibe Store</span>
                </NavLink>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all hover:text-foreground ${
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/admin/orders"
                  className={({ isActive }) =>
                    `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all hover:text-foreground ${
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </NavLink>
                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                    `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all hover:text-foreground ${
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <Package className="h-5 w-5" />
                  Products
                </NavLink>
                <NavLink
                  to="/admin/customers"
                  className={({ isActive }) =>
                    `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all hover:text-foreground ${
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <Users className="h-5 w-5" />
                  Customers
                </NavLink>
                <NavLink
                  to="/admin/analytics"
                  className={({ isActive }) =>
                    `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all hover:text-foreground ${
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          {location.pathname === "/admin/products" && (
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
          )}
          <div className="flex-1"></div>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
