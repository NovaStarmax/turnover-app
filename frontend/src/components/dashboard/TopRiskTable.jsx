import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import RiskBadge from "@/components/ui/RiskBadge"

export default function TopRiskTable({ employees }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Collaborateurs prioritaires</CardTitle>
          <Link to="/employees">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              Voir tous →
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Collaborateur</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Niveau</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>

                <TableCell>
                  <div>
                    <p className="text-sm font-medium text-foreground">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.id}</p>
                  </div>
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {emp.service}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${emp.score * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-foreground">
                      {emp.score.toFixed(2)}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <RiskBadge level={emp.risk} />
                </TableCell>

                <TableCell>
                  <Link to={`/employee/${emp.id}`}>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Fiche →
                    </Button>
                  </Link>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
