import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockLogs = [
  { time: "20/02/2026 11:02", actor: "S. Legrand",    resource: "GET /predictions?service=Commercial",    method: "GET" },
  { time: "20/02/2026 10:47", actor: "Mme Y (DRH)",   resource: "PATCH /users/004/role → MANAGER",        method: "PATCH" },
  { time: "20/02/2026 10:33", actor: "C. Vidal",      resource: "GET /predictions/EMP-0421",              method: "GET" },
  { time: "20/02/2026 09:55", actor: "P. Rousseau",   resource: "GET /predictions?service=Commercial",    method: "GET" },
  { time: "20/02/2026 09:14", actor: "Mme Y (DRH)",   resource: "GET /audit/logs",                        method: "GET" },
  { time: "20/02/2026 06:02", actor: "Système (batch)", resource: "POST /predictions/batch — 600 salariés", method: "POST" },
]

const methodStyle = {
  GET:   "bg-blue-500/10 text-blue-700 border-blue-500/20",
  POST:  "bg-accent/10 text-accent border-accent/20",
  PATCH: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
}

export default function AuditTab() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Journal d'audit</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Accès et actions sensibles — 24 dernières heures
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wide px-6 py-3 font-medium">Horodatage</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wide px-6 py-3 font-medium">Acteur</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wide px-6 py-3 font-medium">Ressource</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wide px-6 py-3 font-medium">Méthode</th>
            </tr>
          </thead>
          <tbody>
            {mockLogs.map((log, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-6 py-3 text-xs font-mono text-muted-foreground">{log.time}</td>
                <td className="px-6 py-3 text-sm font-medium">{log.actor}</td>
                <td className="px-6 py-3 text-xs font-mono text-muted-foreground">{log.resource}</td>
                <td className="px-6 py-3">
                  <Badge variant="outline" className={`text-xs ${methodStyle[log.method]}`}>
                    {log.method}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}