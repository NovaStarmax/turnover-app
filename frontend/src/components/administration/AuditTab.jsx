import { useState, useEffect } from "react";
import { adminService } from "@/lib/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const methodStyle = {
  GET: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  POST: "bg-accent/10 text-accent border-accent/20",
  PATCH: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
};

export default function AuditTab() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminService
      .getAuditLogs()
      .then((res) => setData(res.data))
      .catch(() => setError("Impossible de charger les logs"))
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

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Journal d'audit</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          {data.total} entrées — 24 dernières heures
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wide px-6 py-3 font-medium">
                Horodatage
              </th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wide px-6 py-3 font-medium">
                Acteur
              </th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wide px-6 py-3 font-medium">
                Ressource
              </th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wide px-6 py-3 font-medium">
                Méthode
              </th>
            </tr>
          </thead>
          <tbody>
            {data.logs.map((log, i) => (
              <tr
                key={i}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-3 text-xs font-mono text-muted-foreground">
                  {log.timestamp}
                </td>
                <td className="px-6 py-3 text-sm font-medium">{log.actor}</td>
                <td className="px-6 py-3 text-xs font-mono text-muted-foreground">
                  {log.resource}
                </td>
                <td className="px-6 py-3">
                  <Badge
                    variant="outline"
                    className={`text-xs ${methodStyle[log.method]}`}
                  >
                    {log.method}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
