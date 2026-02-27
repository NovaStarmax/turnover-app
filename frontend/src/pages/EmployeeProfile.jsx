import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { employeeService, predictionService } from "@/lib/services";
import EmployeeHero from "@/components/employee/EmployeeHero";
import ShapFactors from "@/components/employee/ShapFactors";
import RhHistory from "@/components/employee/RhHistory";

export default function EmployeeProfile() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // On lance les deux appels en parallèle
    // Promise.all attend que les DEUX soient terminés
    Promise.all([employeeService.getById(id), predictionService.getById(id)])
      .then(([empRes, predRes]) => {
        setEmployee(empRes.data);
        setPrediction(predRes.data);
      })
      .catch(() => setError("Impossible de charger la fiche collaborateur"))
      .finally(() => setLoading(false));
  }, [id]);

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

  // Données combinées employé + prédiction
  const fullEmployee = {
    ...employee,
    score: prediction.score,
    risk: prediction.risk,
    trend: prediction.trend,
    shapFactors: prediction.shap_factors,
    // Données pas encore dans l'API — valeurs par défaut en attendant la BDD
    contract: "CDI",
    position: "—",
    startDate: "—",
    absences: 0,
    lastPromotion: "—",
  };

  // Historique mocké en attendant la route API
  const history = [
    {
      date: "20/02/2026",
      author: "Système",
      text: "Score passé en risque élevé",
      type: "alert",
    },
    {
      date: "10/12/2025",
      author: "Manager",
      text: "Entretien annuel réalisé",
      type: "event",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Link to="/employees">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground -ml-2"
        >
          <ArrowLeft size={14} />
          Retour à la liste
        </Button>
      </Link>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <EmployeeHero employee={fullEmployee} />
          <ShapFactors factors={fullEmployee.shapFactors} />
        </div>
        <div className="flex flex-col gap-6">
          <RhHistory history={history} />
        </div>
      </div>
    </div>
  );
}
