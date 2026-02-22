import { Card, CardContent } from "@/components/ui/card"

const deltaStyles = {
  danger:  "text-destructive",
  success: "text-accent",
  neutral: "text-muted-foreground",
}

export default function KpiCard({ label, value, suffix, delta, deltaType, icon: Icon }) {
  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-3">

        {/* Header : label + icône */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <Icon size={15} className="text-muted-foreground" />
          </div>
        </div>

        {/* Valeur principale */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{suffix}</span>
        </div>

        {/* Delta */}
        <span className={`text-xs ${deltaStyles[deltaType]}`}>
          {delta}
        </span>

      </CardContent>
    </Card>
  )
}