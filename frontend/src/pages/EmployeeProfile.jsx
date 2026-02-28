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
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      employeeService.getById(id),
      predictionService.getById(id),
      employeeService.getHistory(id),
    ])
      .then(([empRes, predRes, histRes]) => {
        setEmployee(empRes.data);
        setPrediction(predRes.data);
        setHistory(histRes.data.history);
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

  const fullEmployee = {
    ...employee,
    score: prediction.score,
    risk: prediction.risk,
    trend: prediction.trend,
    shapFactors: prediction.shap_factors,
  };

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
