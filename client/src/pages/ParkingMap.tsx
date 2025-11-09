import { useLocation } from "wouter";
import { Car, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DarkModeToggle from "@/components/DarkModeToggle";

type SpotStatus = "available" | "reserved" | "occupied";

interface ParkingSpot {
  id: number;
  status: SpotStatus;
  clientName?: string;
  eta?: string;
  endTime?: string;
}

export default function ParkingMap() {
  const [, setLocation] = useLocation();
  
  const spots: ParkingSpot[] = [
    { id: 1, status: "available" },
    { id: 2, status: "reserved", clientName: "Marie Laurent", eta: "15 min", endTime: "14:30" },
    { id: 3, status: "available" },
    { id: 4, status: "occupied", clientName: "Pierre Dubois", endTime: "16:00" },
    { id: 5, status: "available" },
  ];

  const getStatusColor = (status: SpotStatus) => {
    switch (status) {
      case "available":
        return "bg-parking-available hover:bg-green-600";
      case "reserved":
        return "bg-parking-reserved";
      case "occupied":
        return "bg-parking-occupied";
    }
  };

  const getStatusIcon = (status: SpotStatus) => {
    switch (status) {
      case "available":
        return "🟢";
      case "reserved":
        return "🔵";
      case "occupied":
        return "🔴";
    }
  };

  const handleSpotClick = (spot: ParkingSpot) => {
    if (spot.status === "available") {
      setLocation(`/reserve/${spot.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SmartPark</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setLocation("/reservation-history")}
              data-testid="button-history"
            >
              Mes réservations
            </Button>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Places de parking disponibles</h1>
          <div className="flex gap-6 justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🟢</span>
              <span className="text-muted-foreground">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔵</span>
              <span className="text-muted-foreground">Réservé</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔴</span>
              <span className="text-muted-foreground">Occupé</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {spots.map((spot) => (
            <Card
              key={spot.id}
              className={`${
                spot.status === "available" ? "cursor-pointer hover-elevate active-elevate-2" : "cursor-not-allowed opacity-75"
              } transition-all overflow-visible`}
              onClick={() => handleSpotClick(spot)}
              data-testid={`card-spot-${spot.id}`}
            >
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">{getStatusIcon(spot.status)}</div>
                  <h3 className="text-3xl font-bold mb-2">Place {spot.id}</h3>
                  <Badge
                    className={`${getStatusColor(spot.status)} text-white mb-4`}
                    data-testid={`badge-status-${spot.id}`}
                  >
                    {spot.status === "available" && "Disponible"}
                    {spot.status === "reserved" && "Réservé"}
                    {spot.status === "occupied" && "Occupé"}
                  </Badge>

                  {spot.status !== "available" && spot.clientName && (
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{spot.clientName}</span>
                      </div>
                      {spot.eta && (
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Arrive dans {spot.eta}</span>
                        </div>
                      )}
                      {spot.endTime && (
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Jusqu'à {spot.endTime}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
