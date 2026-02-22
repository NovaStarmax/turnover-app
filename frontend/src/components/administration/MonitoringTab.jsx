import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const apiKpis = [
  { label: "Statut API",        value: "UP",    sub: "Opérationnel",      subColor: "text-accent" },
  { label: "Requêtes (24h)",    value: "1 284", sub: "↑ +12 % vs hier",   subColor: "text-accent" },
  { label: "Latence moy.",      value: "142ms", sub: "Normal",            subColor: "text-muted-foreground" },
  { label: "Erreurs (24h)",     value: "3",     sub: "1× 403 · 2× 404",  subColor: "text-yellow-600" },
]

const endpoints = [
  { route: "GET /predictions",       count: 612, color: "bg-primary",     pct: 48 },
  { route: "GET /employees",         count: 387, color: "bg-secondary",   pct: 30 },
  { route: "POST /auth/login",       count: 198, color: "bg-accent",      pct: 16 },
  { route: "PATCH /users/{id}/role", count: 87,  color: "bg-yellow-500",  pct: 7  },
]

export default function MonitoringTab() {
  return (
    <div className="flex flex-col gap-4">

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {apiKpis.map(({ label, value, sub, subColor }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{label}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Répartition endpoints */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Répartition des endpoints</CardTitle>
          <p className="text-xs text-muted-foreground">Requêtes par route — 24h</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {endpoints.map(({ route, count, color, pct }) => (
            <div key={route} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-foreground">{route}</span>
                <span className="text-xs text-muted-foreground">{count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  )
}