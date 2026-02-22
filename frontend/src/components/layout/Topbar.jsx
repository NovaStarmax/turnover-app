import { useLocation } from "react-router-dom"

const pageTitles = {
  "/dashboard": "Vue d'ensemble",
  "/employees": "Collaborateurs",
  "/administration": "Administration",
}

export default function Topbar() {
  const { pathname } = useLocation()

  // Gère aussi /employee/:id
  const title = pageTitles[pathname] ?? "Fiche collaborateur"

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
      <h1 className="text-sm font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-xs text-muted-foreground">
          Scoring du jour — actif
        </span>
      </div>
    </header>
  )
}