import { Badge } from "@/components/ui/badge"

const config = {
  high:   { label: "Élevé",  className: "bg-destructive/10 text-destructive border-destructive/20" },
  medium: { label: "Modéré", className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20" },
  low:    { label: "Faible", className: "bg-accent/10 text-accent border-accent/20" },
}

export default function RiskBadge({ level }) {
  const { label, className } = config[level]

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}