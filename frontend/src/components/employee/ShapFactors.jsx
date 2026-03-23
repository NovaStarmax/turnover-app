import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShapFactors({ factors }) {
  const maxContribution = Math.max(...factors.map(f => f.contribution))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Facteurs explicatifs</CardTitle>
        <p className="text-xs text-muted-foreground">Contributions SHAP — pourquoi ce score ?</p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {factors.map((factor) => (
          <div key={factor.label} className="flex flex-col gap-1.5">

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">{factor.label}</span>
                <span className="text-xs text-muted-foreground ml-2">{factor.detail}</span>
              </div>
              <span className={`text-xs font-mono font-medium ${factor.positive ? "text-destructive" : "text-accent"}`}>
                {factor.positive ? "+" : "−"}{factor.contribution.toFixed(2)}
              </span>
            </div>

            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full ${factor.positive ? "bg-destructive" : "bg-accent"}`}
                style={{ width: `${(factor.contribution / maxContribution) * 100}%` }}
              />
            </div>

          </div>
        ))}

        <div className="mt-2 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground leading-relaxed">
            ⚠ Ce score est une <strong>aide à la décision</strong>. Il ne préjuge pas des intentions du collaborateur. Une revue humaine est recommandée avant toute action.
          </p>
        </div>

      </CardContent>
    </Card>
  )
}
