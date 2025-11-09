import { Car, Users, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function AdminDashboard() {
  const spots = [
    { id: 1, status: "available" as const },
    { id: 2, status: "reserved" as const, client: "Marie Laurent", eta: "15 min" },
    { id: 3, status: "available" as const },
    { id: 4, status: "occupied" as const, client: "Pierre Dubois" },
    { id: 5, status: "available" as const },
  ];

  const stats = {
    total: 5,
    available: 3,
    reserved: 1,
    occupied: 1,
  };

  const revenueToday = 340;

  const recentClients = [
    { name: "Marie Laurent", spot: 2, eta: "15 min", amount: "60 MAD", code: "12345" },
    { name: "Pierre Dubois", spot: 4, eta: "Arrivé", amount: "80 MAD", code: "67890" },
    { name: "Sophie Martin", spot: 1, eta: "30 min", amount: "40 MAD", code: "54321" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-parking-available";
      case "reserved":
        return "bg-parking-reserved";
      case "occupied":
        return "bg-parking-occupied";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return "🟢";
      case "reserved":
        return "🔵";
      case "occupied":
        return "🔴";
      default:
        return "⚪";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SmartPark Admin</span>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Tableau de bord</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Places</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500" data-testid="stat-available">
                {stats.available}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Réservées</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500" data-testid="stat-reserved">
                {stats.reserved}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus aujourd'hui</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-revenue">
                {revenueToday} MAD
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Vue d'ensemble des places</CardTitle>
              <CardDescription>État en temps réel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spots.map((spot) => (
                  <div
                    key={spot.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                    data-testid={`spot-overview-${spot.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{getStatusIcon(spot.status)}</span>
                      <div>
                        <p className="font-semibold">Place {spot.id}</p>
                        {spot.client && (
                          <p className="text-sm text-muted-foreground">
                            <Users className="inline h-3 w-3 mr-1" />
                            {spot.client}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getStatusColor(spot.status)} text-white`}>
                        {spot.status === "available" && "Disponible"}
                        {spot.status === "reserved" && "Réservé"}
                        {spot.status === "occupied" && "Occupé"}
                      </Badge>
                      {spot.eta && (
                        <p className="text-xs text-muted-foreground mt-1">ETA: {spot.eta}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clients récents</CardTitle>
              <CardDescription>Réservations actives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border"
                    data-testid={`client-${index}`}
                  >
                    <div>
                      <p className="font-semibold">{client.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Place {client.spot} • Code: ••{client.code.slice(-2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{client.amount}</p>
                      <p className="text-xs text-muted-foreground">ETA: {client.eta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques financières</CardTitle>
            <CardDescription>Aperçu des revenus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <p className="text-sm text-muted-foreground mb-2">Revenus moyens / place</p>
                <p className="text-3xl font-bold text-primary">68 MAD</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-500/10">
                <p className="text-sm text-muted-foreground mb-2">Taux d'occupation</p>
                <p className="text-3xl font-bold text-green-500">40%</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-500/10">
                <p className="text-sm text-muted-foreground mb-2">Durée moyenne</p>
                <p className="text-3xl font-bold text-blue-500">3.2h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
