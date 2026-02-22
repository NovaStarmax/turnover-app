import { useState } from "react";
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

const mockEmployees = [
  {
    id: "EMP-0421",
    name: "A. Laurent",
    service: "Commercial",
    tenure: "2 ans 3 mois",
    score: 0.92,
    risk: "high",
  },
  {
    id: "EMP-0187",
    name: "M. Bernard",
    service: "Technique",
    tenure: "1 an 8 mois",
    score: 0.87,
    risk: "high",
  },
  {
    id: "EMP-0334",
    name: "S. Clément",
    service: "Finance",
    tenure: "4 ans",
    score: 0.71,
    risk: "high",
  },
  {
    id: "EMP-0562",
    name: "P. Dubois",
    service: "Commercial",
    tenure: "3 ans 1 mois",
    score: 0.65,
    risk: "medium",
  },
  {
    id: "EMP-0093",
    name: "E. Martin",
    service: "RH",
    tenure: "5 ans 7 mois",
    score: 0.58,
    risk: "medium",
  },
  {
    id: "EMP-0278",
    name: "C. Fontaine",
    service: "Technique",
    tenure: "8 mois",
    score: 0.54,
    risk: "medium",
  },
  {
    id: "EMP-0401",
    name: "N. Richard",
    service: "Juridique",
    tenure: "2 ans",
    score: 0.49,
    risk: "medium",
  },
  {
    id: "EMP-0155",
    name: "J. Thomas",
    service: "Direction",
    tenure: "7 ans 2 mois",
    score: 0.41,
    risk: "medium",
  },
  {
    id: "EMP-0312",
    name: "L. Girard",
    service: "Finance",
    tenure: "3 ans 5 mois",
    score: 0.28,
    risk: "low",
  },
  {
    id: "EMP-0489",
    name: "R. Petit",
    service: "Commercial",
    tenure: "6 ans",
    score: 0.19,
    risk: "low",
  },
  {
    id: "EMP-0210",
    name: "T. Moreau",
    service: "RH",
    tenure: "1 an",
    score: 0.15,
    risk: "low",
  },
  {
    id: "EMP-0367",
    name: "A. Simon",
    service: "Technique",
    tenure: "4 ans 2 mois",
    score: 0.12,
    risk: "low",
  },
];

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
  const [search, setSearch] = useState("");
  const [service, setService] = useState("Tous");
  const [risk, setRisk] = useState("all");

  // Logique de filtrage
  const filtered = mockEmployees.filter((emp) => {
    const matchSearch = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchService = service === "Tous" || emp.service === service;
    const matchRisk = risk === "all" || emp.risk === risk;
    return matchSearch && matchService && matchRisk;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Barre de filtres */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Recherche */}
        <Input
          placeholder="Rechercher un collaborateur…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />

        {/* Filtre service */}
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

        {/* Filtre risque */}
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

        {/* Compteur résultats */}
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Tableau */}
      <EmployeesTable employees={filtered} />
    </div>
  );
}
