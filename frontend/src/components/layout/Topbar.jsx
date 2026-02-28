import { useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

const pageTitles = {
  "/dashboard": "Vue d'ensemble",
  "/employees": "Collaborateurs",
  "/administration": "Administration",
};

export default function Topbar() {
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();

  const title = pageTitles[pathname] ?? "Fiche collaborateur";

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
      <h1 className="text-sm font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Statut scoring */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground">
            Scoring du jour — actif
          </span>
        </div>

        {/* Toggle dark mode */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className="w-8 h-8 p-0"
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </Button>
      </div>
    </header>
  );
}
