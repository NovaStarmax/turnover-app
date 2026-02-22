import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, Users, ShieldCheck } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { to: "/employees", label: "Collaborateurs", icon: Users },
  { to: "/administration", label: "Administration", icon: ShieldCheck },
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="w-56 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed top-0 left-0">
      {/* Logo */}
      <Link
        to="/dashboard"
        className="px-5 py-5 border-b border-sidebar-border block hover:bg-sidebar-accent transition-colors"
      >
        <span className="font-bold text-sidebar-foreground text-sm tracking-wide uppercase">
          RH Predict
        </span>
      </Link>

      {/* Navigation */}
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

      {/* Utilisateur en bas */}
      {/* Utilisateur en bas */}
      <div className="p-4 border-t border-sidebar-border">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-3 w-full hover:bg-sidebar-accent rounded-md p-1 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                MY
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-sidebar-foreground">
                  Mme Y
                </p>
                <p className="text-xs text-muted-foreground">RH Admin</p>
              </div>
            </button>
          </PopoverTrigger>

          <PopoverContent side="top" align="start" className="w-44 p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => navigate("/")}
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
