import { useState, useEffect } from "react";
import { employeeService, adminService } from "@/lib/services";
import KpiCard from "@/components/dashboard/KpiCard";
import TopRiskTable from "@/components/dashboard/TopRiskTable";
import { Users, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([employeeService.getAll(), adminService.getMetrics()])
      .then(([empRes, metricsRes]) => {
        setEmployees(empRes.data);
        setMetrics(metricsRes.data);
      })
      .catch(() => setError("Impossible de charger le dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );

  const highRisk = employees.filter((e) => e.risk === "high").length;
  const mediumRisk = employees.filter((e) => e.risk === "medium").length;
  const topRisk = employees
    .filter((e) => e.risk === "high")
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const kpiData = [
    {
      label: "Risque élevé",
      value: highRisk,
      suffix: `/ ${employees.length}`,
      delta: "+6 vs mois dernier",
      deltaType: "danger",
      icon: TrendingUp,
    },
    {
      label: "Risque modéré",
      value: mediumRisk,
      suffix: `/ ${employees.length}`,
      delta: "Stable",
      deltaType: "neutral",
      icon: Users,
    },
    {
      label: "Turnover actuel",
      value: metrics.turnover_rate,
      suffix: "%",
      delta: "Objectif −5 %",
      deltaType: "neutral",
      icon: TrendingDown,
    },
    {
      label: "Coût évité estimé",
      value: `${(metrics.cost_avoided / 1000).toFixed(0)}k`,
      suffix: "€",
      delta: "+12k ce mois",
      deltaType: "success",
      icon: DollarSign,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>
      <TopRiskTable employees={topRisk} />
    </div>
  );
}
