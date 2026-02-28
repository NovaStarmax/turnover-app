import { useState, useEffect } from "react";
import { adminService } from "@/lib/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const driftBarColor = {
  green: "bg-accent",
  yellow: "bg-yellow-500",
  red: "bg-destructive",
};

export default function ModelTab() {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminService
      .getModel()
      .then((res) => setModel(res.data))
      .catch(() => setError("Impossible de charger les données du modèle"))
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

  const metrics = [
    { label: "Version", value: model.version, sub: model.algorithm },
    {
      label: "Entraîné le",
      value: model.trained_at,
      sub: `Données ${model.data_range}`,
    },
    {
      label: "Recall (départ)",
      value: `${(model.recall * 100).toFixed(0)} %`,
      sub: `Seuil minimum : ${(model.recall_threshold * 100).toFixed(0)} %`,
      valueColor: "text-accent",
    },
    {
      label: "AUC-ROC",
      value: model.auc_roc,
      sub: `Seuil minimum : ${model.auc_threshold}`,
      valueColor: "text-accent",
    },
  ];

  const maxDrift = Math.max(...model.drift_variables.map((d) => d.drift_pct));

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">
                Version active du modèle
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Dernière évaluation — {model.last_evaluation}
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="text-xs">
                  Réentraîner
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Relancer l'entraînement ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action va déclencher un réentraînement complet du
                    modèle. Le processus peut prendre plusieurs minutes.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                    Confirmer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-3">
          {metrics.map(({ label, value, sub, valueColor }) => (
            <div key={label} className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                {label}
              </p>
              <p
                className={`text-xl font-bold ${valueColor ?? "text-foreground"}`}
              >
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Dérive des variables</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Écart distribution train vs production
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {model.drift_variables.map(({ label, drift_pct, color }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{label}</span>
                <span className="text-xs font-mono text-muted-foreground">
                  {drift_pct} % dérive
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${driftBarColor[color]}`}
                  style={{ width: `${(drift_pct / maxDrift) * 100}%` }}
                />
              </div>
            </div>
          ))}

          <div className="mt-1 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground leading-relaxed">
              ⚠ La variable <strong>nb formations</strong> présente une dérive
              significative. Un réentraînement est conseillé.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
