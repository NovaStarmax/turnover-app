import KpiCard from "@/components/dashboard/KpiCard"
import TopRiskTable from "@/components/dashboard/TopRiskTable"
import { Users, TrendingUp, TrendingDown, DollarSign } from "lucide-react"

const kpiData = [
  {
    label: "Risque élevé",
    value: 42,
    suffix: "/ 600",
    delta: "+6 vs mois dernier",
    deltaType: "danger",
    icon: TrendingUp,
  },
  {
    label: "Risque modéré",
    value: 87,
    suffix: "/ 600",
    delta: "Stable",
    deltaType: "neutral",
    icon: Users,
  },
  {
    label: "Turnover actuel",
    value: 20,
    suffix: "%",
    delta: "Objectif −5 %",
    deltaType: "neutral",
    icon: TrendingDown,
  },
  {
    label: "Coût évité estimé",
    value: "84k",
    suffix: "€",
    delta: "+12k ce mois",
    deltaType: "success",
    icon: DollarSign,
  },
]

const topRiskEmployees = [
  { id: "EMP-0421", name: "A. Laurent",  service: "Commercial", score: 0.92, risk: "high" },
  { id: "EMP-0187", name: "M. Bernard",  service: "Technique",  score: 0.87, risk: "high" },
  { id: "EMP-0334", name: "S. Clément",  service: "Finance",    score: 0.71, risk: "high" },
  { id: "EMP-0562", name: "P. Dubois",   service: "Commercial", score: 0.65, risk: "medium" },
  { id: "EMP-0093", name: "E. Martin",   service: "RH",         score: 0.58, risk: "medium" },
]

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>
        <TopRiskTable employees={topRiskEmployees} />
    </div>
  )
}