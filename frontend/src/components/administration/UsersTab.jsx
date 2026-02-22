import { useState } from "react";
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
import { Check, Copy } from "lucide-react";

const mockUsers = [
  {
    id: 1,
    initials: "MY",
    name: "Mme Y (DRH)",
    email: "y@entreprise.fr",
    role: "RH_ADMIN",
    status: "active",
    lastSeen: "Aujourd'hui, 09:14",
  },
  {
    id: 2,
    initials: "CV",
    name: "C. Vidal",
    email: "c.vidal@entreprise.fr",
    role: "RH_STANDARD",
    status: "active",
    lastSeen: "Aujourd'hui, 08:55",
  },
  {
    id: 3,
    initials: "PR",
    name: "P. Rousseau",
    email: "p.rousseau@entreprise.fr",
    role: "MANAGER",
    status: "active",
    lastSeen: "Hier, 17:30",
  },
  {
    id: 4,
    initials: "JM",
    name: "J. Morel",
    email: "j.morel@entreprise.fr",
    role: "MANAGER",
    status: "inactive",
    lastSeen: "Il y a 5 jours",
  },
  {
    id: 5,
    initials: "SL",
    name: "S. Legrand",
    email: "s.legrand@entreprise.fr",
    role: "RH_STANDARD",
    status: "active",
    lastSeen: "Aujourd'hui, 11:02",
  },
];

const roles = ["RH_ADMIN", "RH_STANDARD", "MANAGER"];

const generateTempPassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from(
    { length: 10 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
};

export default function UsersTab() {
  const [users, setUsers] = useState(mockUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [tempPassword, setTempPassword] = useState(null);
  const [copied, setCopied] = useState(false);

  const updateRole = (id, newRole) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  const handleInvite = () => {
    setTempPassword(generateTempPassword());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tempPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setInviteEmail("");
    setTempPassword(null);
    setCopied(false);
  };

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
                      Un mot de passe temporaire sera généré. L'utilisateur
                      devra le changer à sa première connexion.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-2 py-2">
                    <Label htmlFor="invite-email">Adresse email</Label>
                    <Input
                      id="invite-email"
                      type="email"
                      placeholder="prenom.nom@entreprise.fr"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                      Annuler
                    </Button>
                    <Button
                      onClick={handleInvite}
                      disabled={!inviteEmail.includes("@")}
                    >
                      Envoyer l'invitation
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
                    <div className="flex flex-col gap-2">
                      <Label>Mot de passe temporaire</Label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-muted px-4 py-3 rounded-lg text-sm font-mono tracking-widest text-foreground">
                          {tempPassword}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopy}
                          className="gap-2"
                        >
                          {copied ? (
                            <>
                              <Check size={14} className="text-green-600" />
                              Copié
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              Copier
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ⚠ Ce mot de passe ne sera plus affiché après fermeture de
                      cette fenêtre.
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
                      {user.initials}
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
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-accent" : "bg-yellow-500"}`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {user.status === "active" ? "Actif" : "Inactif"}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-xs text-muted-foreground font-mono">
                  {user.lastSeen}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
