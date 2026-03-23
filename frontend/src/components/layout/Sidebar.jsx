import { NavLink, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, ShieldCheck, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const allNavItems = [
  {
    to: "/dashboard",
    label: "Vue d'ensemble",
    icon: LayoutDashboard,
    roles: ["RH_ADMIN", "RH_STANDARD"],
  },
  {
    to: "/employees",
    label: "Collaborateurs",
    icon: Users,
    roles: ["RH_ADMIN", "RH_STANDARD", "MANAGER"],
  },
  {
    to: "/administration",
    label: "Administration",
    icon: ShieldCheck,
    roles: ["RH_ADMIN"],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = allNavItems.filter((item) =>
    item.roles.includes(user?.role),
  );

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <aside className="w-56 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed top-0 left-0">
      <Link
        to={user?.role === "MANAGER" ? "/employees" : "/dashboard"}
        className="px-5 py-5 border-b border-sidebar-border block hover:bg-sidebar-accent transition-colors"
      >
        <span className="font-bold text-sidebar-foreground text-sm tracking-wide uppercase">
          RH Predict
        </span>
      </Link>

      <nav className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
              ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-3 w-full hover:bg-sidebar-accent rounded-md p-1 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                {initials}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-sidebar-foreground">
                  {user?.name ?? "—"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.role ?? "—"}
                </p>
              </div>
            </button>
          </PopoverTrigger>

          <PopoverContent side="top" align="start" className="w-44 p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut size={14} />
              Se déconnecter
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
}
