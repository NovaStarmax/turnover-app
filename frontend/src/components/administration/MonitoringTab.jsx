import { useState, useEffect } from "react";
import { adminService } from "@/lib/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MonitoringTab() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminService
      .getMetrics()
      .then((res) => setMetrics(res.data))
      .catch(() => setError("Impossible de charger les métriques"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );

  const apiKpis = [
    {
      label: "Statut API",
      value: metrics.status === "ok" ? "UP" : "DOWN",
      subColor: "text-accent",
    },
    {
      label: "Requêtes (24h)",
      value: metrics.requests_24h.toLocaleString(),
      subColor: "text-accent",
    },
    {
      label: "Latence moy.",
      value: `${metrics.avg_latency_ms}ms`,
      subColor: "text-muted-foreground",
    },
    {
      label: "Erreurs (24h)",
      value: metrics.errors_24h,
      subColor: "text-yellow-600",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        {apiKpis.map(({ label, value, subColor }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                {label}
              </p>
              <p className={`text-2xl font-bold ${subColor}`}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Informations batch</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Dernier batch</span>
            <span className="font-mono">{metrics.last_batch_date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Collaborateurs scorés</span>
            <span className="font-mono">{metrics.employees_scored}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
