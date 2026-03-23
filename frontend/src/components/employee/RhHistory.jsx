import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const dotColor = {
  alert:   "bg-destructive",
  comment: "bg-yellow-500",
  event:   "bg-muted-foreground",
}

export default function RhHistory({ history }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Historique RH</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-0">
          {history.map((item, index) => (
            <div key={index} className="flex gap-3">

              <div className="flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dotColor[item.type]}`} />
                {index < history.length - 1 && (
                  <div className="w-px flex-1 bg-border my-1" />
                )}
              </div>

              <div className="pb-4">
                <p className="text-sm text-foreground leading-snug">{item.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.date} — {item.author}
                </p>
              </div>

            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
