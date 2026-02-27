import { useState, useEffect } from "react";
import { userService } from "@/lib/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const roles = ["RH_ADMIN", "RH_STANDARD", "MANAGER"];

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("RH_STANDARD");
  const [tempPassword, setTempPassword] = useState(null);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState(null);

  useEffect(() => {
    userService
      .getAll()
      .then((res) => setUsers(res.data))
      .catch(() => setError("Impossible de charger les utilisateurs"))
      .finally(() => setLoading(false));
  }, []);

  const updateRole = (id, newRole) => {
    userService
      .updateRole(id, newRole)
      .then((res) => {
        setUsers(users.map((u) => (u.id === id ? res.data : u)));
      })
      .catch(() => alert("Erreur lors de la mise à jour du rôle"));
  };

  const handleInvite = () => {
    setInviteLoading(true);
    setInviteError(null);

    userService
      .register(inviteEmail, inviteRole)
      .then((res) => setTempPassword(res.data.temp_password))
      .catch((err) =>
        setInviteError(
          err.response?.data?.detail ?? "Erreur lors de la création",
        ),
      )
      .finally(() => setInviteLoading(false));
  };

  const handleClose = () => {
    setDialogOpen(false);
    setInviteEmail("");
    setInviteRole("RH_STANDARD");
    setTempPassword(null);
    setInviteError(null);
  };

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

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Utilisateurs et rôles</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Modifier le rôle d'accès de chaque utilisateur
            </p>
          </div>

          <Button size="sm" onClick={() => setDialogOpen(true)}>
            + Inviter
          </Button>

          <Dialog open={dialogOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
              {!tempPassword ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Inviter un utilisateur</DialogTitle>
                    <DialogDescription>
                      Un mot de passe temporaire sera généré.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-3 py-2">
                    <div className="flex flex-col gap-2">
                      <Label>Adresse email</Label>
                      <Input
                        type="email"
                        placeholder="prenom.nom@entreprise.fr"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Rôle</Label>
                      <Select value={inviteRole} onValueChange={setInviteRole}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {inviteError && (
                      <p className="text-xs text-destructive">{inviteError}</p>
                    )}
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                      Annuler
                    </Button>
                    <Button
                      onClick={handleInvite}
                      disabled={!inviteEmail.includes("@") || inviteLoading}
                    >
                      {inviteLoading ? "Création..." : "Envoyer l'invitation"}
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle>Invitation créée</DialogTitle>
                    <DialogDescription>
                      Transmettez ces informations à{" "}
                      <strong>{inviteEmail}</strong>.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-3 py-2">
                    <Label>Mot de passe temporaire</Label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-muted px-4 py-3 rounded-lg text-sm font-mono tracking-widest">
                        {tempPassword}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigator.clipboard.writeText(tempPassword)
                        }
                      >
                        Copier
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ⚠ Ce mot de passe ne sera plus affiché après fermeture.
                    </p>
                  </div>

                  <DialogFooter>
                    <Button onClick={handleClose}>Fermer</Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière connexion</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Select
                    value={user.role}
                    onValueChange={(val) => updateRole(user.id, val)}
                  >
                    <SelectTrigger className="w-36 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r} className="text-xs">
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-xs text-muted-foreground">Actif</span>
                  </div>
                </TableCell>

                <TableCell className="text-xs text-muted-foreground font-mono">
                  —
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
