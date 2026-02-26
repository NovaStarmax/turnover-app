import { useState, useEffect } from "react";
import { employeeService } from "@/lib/services";
import EmployeesTable from "@/components/employees/EmployeesTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const services = [
  "Tous",
  "Commercial",
  "Technique",
  "Finance",
  "RH",
  "Juridique",
  "Direction",
];
const riskLevels = [
  { value: "all", label: "Tous" },
  { value: "high", label: "Élevé" },
  { value: "medium", label: "Modéré" },
  { value: "low", label: "Faible" },
];

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [service, setService] = useState("Tous");
  const [risk, setRisk] = useState("all");

  // Rechargement quand les filtres service ou risk changent
  useEffect(() => {
    setLoading(true);
    employeeService
      .getAll({ service, risk })
      .then((res) => setEmployees(res.data))
      .catch(() => setError("Impossible de charger les collaborateurs"))
      .finally(() => setLoading(false));
  }, [service, risk]); // ← se relance quand service ou risk change

  // Filtre search appliqué côté front — pas besoin d'appel API
  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (error)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {/* Barre de filtres */}
      <div className="flex items-center gap-3 flex-wrap">
        <Input
          placeholder="Rechercher un collaborateur…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />

        <Select value={service} onValueChange={setService}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-1">
          {riskLevels.map((r) => (
            <Button
              key={r.value}
              variant={risk === r.value ? "default" : "outline"}
              size="sm"
              onClick={() => setRisk(r.value)}
              className="text-xs"
            >
              {r.label}
            </Button>
          ))}
        </div>

        <span className="text-xs text-muted-foreground ml-auto">
          {loading
            ? "Chargement..."
            : `${filtered.length} résultat${filtered.length > 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Tableau */}
      <EmployeesTable employees={filtered} loading={loading} />
    </div>
  );
}
