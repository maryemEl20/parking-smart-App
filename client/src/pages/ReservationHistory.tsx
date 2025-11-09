import { useState } from "react";
import { useLocation } from "wouter";
import { Car, Calendar, Clock, DollarSign, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DarkModeToggle from "@/components/DarkModeToggle";

interface Reservation {
  id: number;
  spotId: number;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  cost: number;
  accessCode: string;
  status: "upcoming" | "active" | "completed";
  eta?: string;
}

export default function ReservationHistory() {
  const [, setLocation] = useLocation();
  const [revealedCodes, setRevealedCodes] = useState<Set<number>>(new Set());

  const reservations: Reservation[] = [
    {
      id: 1,
      spotId: 2,
      date: "2025-01-15",
      startTime: "14:00",
      endTime: "17:00",
      duration: 3,
      cost: 60,
      accessCode: "12345",
      status: "upcoming",
      eta: "15 min",
    },
    {
      id: 2,
      spotId: 4,
      date: "2025-01-14",
      startTime: "09:00",
      endTime: "13:00",
      duration: 4,
      cost: 80,
      accessCode: "67890",
      status: "completed",
    },
    {
      id: 3,
      spotId: 1,
      date: "2025-01-13",
      startTime: "10:00",
      endTime: "12:00",
      duration: 2,
      cost: 40,
      accessCode: "54321",
      status: "completed",
    },
  ];

  const toggleCodeReveal = (id: number) => {
    const newSet = new Set(revealedCodes);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setRevealedCodes(newSet);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500 text-white">À venir</Badge>;
      case "active":
        return <Badge className="bg-green-500 text-white">En cours</Badge>;
      case "completed":
        return <Badge variant="secondary">Terminé</Badge>;
      default:
        return null;
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
              onClick={() => setLocation("/parking")}
              data-testid="button-back-parking"
            >
              Retour au parking
            </Button>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Mes réservations</h1>
            <p className="text-muted-foreground">Historique et réservations à venir</p>
          </div>

          <div className="space-y-6">
            {reservations.map((reservation) => (
              <Card
                key={reservation.id}
                className="overflow-visible"
                data-testid={`reservation-${reservation.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Car className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">Place {reservation.spotId}</h3>
                          {getStatusBadge(reservation.status)}
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(reservation.date).toLocaleDateString("fr-FR")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {reservation.startTime} - {reservation.endTime} ({reservation.duration}h)
                            </span>
                          </div>
                          {reservation.eta && (
                            <div className="flex items-center gap-2 text-blue-500">
                              <Clock className="h-4 w-4" />
                              <span>ETA: {reservation.eta}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Coût total</p>
                        <p className="text-2xl font-bold text-primary">{reservation.cost} MAD</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Code d'accès</p>
                          <p className="text-lg font-mono font-bold">
                            {revealedCodes.has(reservation.id)
                              ? reservation.accessCode
                              : `••${reservation.accessCode.slice(-2)}`}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleCodeReveal(reservation.id)}
                          data-testid={`button-reveal-${reservation.id}`}
                        >
                          {revealedCodes.has(reservation.id) ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {reservations.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucune réservation</h3>
                <p className="text-muted-foreground mb-6">
                  Vous n'avez pas encore de réservations
                </p>
                <Button onClick={() => setLocation("/parking")}>
                  Réserver une place
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
