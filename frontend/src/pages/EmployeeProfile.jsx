import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import EmployeeHero from "@/components/employee/EmployeeHero"
import ShapFactors from "@/components/employee/ShapFactors"
import RhHistory from "@/components/employee/RhHistory"

const mockEmployee = {
  id: "EMP-0421",
  name: "Alexandre Laurent",
  service: "Commercial",
  contract: "CDI",
  position: "Chargé de clientèle senior",
  startDate: "Mars 2023",
  tenure: "2 ans 3 mois",
  score: 0.92,
  risk: "high",
  trend: "up",
  absences: 9,
  lastPromotion: "Aucune",
  shapFactors: [
    { label: "Stagnation de poste",  detail: "Aucune évolution depuis 27 mois", contribution: 0.31, positive: true },
    { label: "Absences récentes",    detail: "+4 jours vs moyenne du service",  contribution: 0.24, positive: true },
    { label: "Aucune formation",     detail: "0 formation sur 12 mois",         contribution: 0.19, positive: true },
    { label: "Ancienneté 2–3 ans",   detail: "Fenêtre de risque critique",      contribution: 0.14, positive: true },
    { label: "Contrat CDI",          detail: "Stabilité contractuelle",         contribution: 0.07, positive: false },
  ],
  history: [
    { date: "20/02/2026", author: "Système",     text: "Score passé en risque élevé",                        type: "alert" },
    { date: "15/01/2026", author: "Mme Y",       text: "Retours managériaux mitigés, à surveiller",          type: "comment" },
    { date: "10/12/2025", author: "Manager",     text: "Entretien annuel réalisé",                           type: "event" },
    { date: "Mars 2023",  author: "Onboarding",  text: "Prise de poste — Chargé de clientèle senior",       type: "event" },
  ],
}

export default function EmployeeProfile() {
  const { id } = useParams()

  // En prod : fetch(id). Pour l'instant on ignore l'id et on retourne le mock
  const employee = mockEmployee

  return (
    <div className="flex flex-col gap-6">

      {/* Retour */}
      <Link to="/employees">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground -ml-2">
          <ArrowLeft size={14} />
          Retour à la liste
        </Button>
      </Link>

      {/* Contenu en deux colonnes */}
      <div className="grid grid-cols-3 gap-6">

        {/* Colonne principale */}
        <div className="col-span-2 flex flex-col gap-6">
          <EmployeeHero employee={employee} />
          <ShapFactors factors={employee.shapFactors} />
        </div>

        {/* Colonne latérale */}
        <div className="flex flex-col gap-6">
          <RhHistory history={employee.history} />
        </div>

      </div>
    </div>
  )
}