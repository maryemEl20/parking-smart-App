import { Car, Users, DollarSign, TrendingUp, Clock, Activity, CreditCard, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  const spots = [
    { id: 1, status: "available" as const },
    { id: 2, status: "reserved" as const, client: "Maryem", eta: "15 min" },
    { id: 3, status: "available" as const },
    { id: 4, status: "occupied" as const, client: "Khaoula" },
    { id: 5, status: "available" as const },
  ];

  const stats = {
    total: 5,
    available: 3,
    reserved: 1,
    occupied: 1,
    revenue: 340,
  };

  const recentClients = [
    { name: "Maryem", spot: 2, eta: "15 min", amount: "60 MAD", code: "12345" },
    { name: "Khaoula", spot: 4, eta: "Arrivé", amount: "80 MAD", code: "67890" },
    { name: "Noura", spot: 1, eta: "30 min", amount: "40 MAD", code: "54321" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "reserved": return "bg-blue-500";
      case "occupied": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return "🟢";
      case "reserved": return "🔵";
      case "occupied": return "🔴";
      default: return "⚪";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gray-800">SmartPark Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="destructive" onClick={handleLogout} type="button">
              Déconnexion
            </Button>
           
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">Tableau de bord</h1>

        {/* Statistiques principales */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total des places</CardTitle>
              <Activity className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Disponibles</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.available}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">Réservées</CardTitle>
              <Clock className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.reserved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Revenus aujourd'hui</CardTitle>
              <CreditCard className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stats.revenue} MAD</div>
            </CardContent>
          </Card>
        </div>

        {/* Vue d'ensemble et clients récents */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Vue d'ensemble des places */}
          <Card>
            <CardHeader>
              <CardTitle>État des places</CardTitle>
              <CardDescription>Vue en temps réel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spots.map((spot) => (
                  <div key={spot.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-sm transition">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{getStatusIcon(spot.status)}</span>
                      <div>
                        <p className="font-semibold text-gray-700">Place {spot.id}</p>
                        {spot.client && (
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Users className="h-3 w-3" />
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
                      {spot.eta && <p className="text-xs text-gray-400 mt-1">ETA: {spot.eta}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clients récents */}
          <Card>
            <CardHeader>
              <CardTitle>Clients récents</CardTitle>
              <CardDescription>Réservations actives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-sm transition">
                    <div>
                      <p className="font-semibold text-gray-700">{client.name}</p>
                      <p className="text-sm text-gray-500">
                        Place {client.spot} • Code: ••{client.code.slice(-2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{client.amount}</p>
                      <p className="text-xs text-gray-400">ETA: {client.eta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques financières */}
        <Card>
          <CardHeader>
            <CardTitle>Finances</CardTitle>
            <CardDescription>Aperçu rapide des revenus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition">
                <p className="text-sm text-gray-500 mb-2">Revenus moyens / place</p>
                <p className="text-3xl font-bold text-primary">68 MAD</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-100 hover:bg-green-200 transition">
                <p className="text-sm text-gray-500 mb-2">Taux d'occupation</p>
                <p className="text-3xl font-bold text-green-500">40%</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-100 hover:bg-blue-200 transition">
                <p className="text-sm text-gray-500 mb-2">Durée moyenne</p>
                <p className="text-3xl font-bold text-blue-500">3.2h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
