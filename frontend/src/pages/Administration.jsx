import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UsersTab from "@/components/administration/UsersTab"
import MonitoringTab from "@/components/administration/MonitoringTab"
import ModelTab from "@/components/administration/ModelTab"
import AuditTab from "@/components/administration/AuditTab"

export default function Administration() {
  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Gestion des rôles</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring API</TabsTrigger>
          <TabsTrigger value="model">Modèle & dérive</TabsTrigger>
          <TabsTrigger value="audit">Logs d'audit</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="users"><UsersTab /></TabsContent>
          <TabsContent value="monitoring"><MonitoringTab /></TabsContent>
          <TabsContent value="model"><ModelTab /></TabsContent>
          <TabsContent value="audit"><AuditTab /></TabsContent>
        </div>
      </Tabs>
    </div>
  )
}