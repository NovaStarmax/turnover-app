import { Card, CardContent } from "@/components/ui/card"
import RiskBadge from "@/components/ui/RiskBadge"

const infoTiles = (emp) => [
  { label: "Ancienneté",          value: emp.tenure },
  { label: "Temps dans le poste", value: emp.tenure },
  { label: "Dernière promotion",  value: emp.lastPromotion },
  { label: "Absences (6 mois)",   value: `${emp.absences} jours` },
]

export default function EmployeeHero({ employee }) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col gap-5">

        {/* Identité */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {employee.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{employee.name}</h2>
              <p className="text-sm text-muted-foreground">
                {employee.id} · {employee.service} · {employee.contract} — {employee.position}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Arrivée : {employee.startDate}</p>
            </div>
          </div>

          {/* Score */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-3xl font-bold font-mono text-foreground">
              {employee.score.toFixed(2)}
            </span>
            <RiskBadge level={employee.risk} />
          </div>
        </div>

        {/* Tuiles infos */}
        <div className="grid grid-cols-4 gap-3">
          {infoTiles(employee).map(({ label, value }) => (
            <div key={label} className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
              <p className="text-sm font-medium text-foreground">{value}</p>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  )
}