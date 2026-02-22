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

const metrics = [
  { label: "Version", value: "v1.2", sub: "Random Forest — 150 arbres" },
  {
    label: "Entraîné le",
    value: "14/02/2026",
    sub: "Données jan. 2024 → fév. 2026",
  },
  {
    label: "Recall (départ)",
    value: "84 %",
    sub: "Seuil minimum : 75 %",
    valueColor: "text-accent",
  },
  {
    label: "AUC-ROC",
    value: "0.89",
    sub: "Seuil minimum : 0.75",
    valueColor: "text-accent",
  },
];

const driftVars = [
  { label: "Ancienneté", pct: 12, value: "3.2 %", color: "bg-accent" },
  {
    label: "Absences (6 mois)",
    pct: 35,
    value: "8.7 %",
    color: "bg-yellow-500",
  },
  {
    label: "Temps sans promotion",
    pct: 20,
    value: "5.1 %",
    color: "bg-accent",
  },
  { label: "Nb formations", pct: 90, value: "22.4 %", color: "bg-destructive" },
];

export default function ModelTab() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Métriques modèle */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">
                Version active du modèle
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Dernière évaluation — 20/02/2026
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
                    modèle sur les données disponibles. Le processus peut
                    prendre plusieurs minutes. Le modèle actuel restera actif
                    jusqu'à la fin.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                    Confirmer le réentraînement
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

      {/* Dérive */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Dérive des variables</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Écart distribution train vs production
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {driftVars.map(({ label, pct, value, color }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{label}</span>
                <span className="text-xs font-mono text-muted-foreground">
                  {value} dérive
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${color}`}
                  style={{ width: `${pct}%` }}
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
