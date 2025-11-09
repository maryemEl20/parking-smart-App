import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { Car, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function ReservationForm() {
  const params = useParams();
  const spotId = params.spotId || "1";
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  const pricePerHour = 20;

  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2025-01-01T${startTime}`);
    const end = new Date(`2025-01-01T${endTime}`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return Math.max(0, hours);
  };

  const duration = calculateDuration();
  const totalPrice = duration * pricePerHour;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startTime || !endTime) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner les heures de début et de fin",
        variant: "destructive",
      });
      return;
    }

    if (duration <= 0) {
      toast({
        title: "Erreur",
        description: "L'heure de fin doit être après l'heure de début",
        variant: "destructive",
      });
      return;
    }

    const reservation = {
      spotId,
      startTime,
      endTime,
      duration,
      totalPrice,
    };
    
    localStorage.setItem("pendingReservation", JSON.stringify(reservation));
    
    toast({
      title: "Réservation préparée",
      description: "Redirection vers le paiement...",
    });
    
    setTimeout(() => {
      setLocation(`/payment/${spotId}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SmartPark</span>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Réservation - Place {spotId}</h1>
            <p className="text-muted-foreground">Sélectionnez vos horaires et confirmez</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Horaires</CardTitle>
                <CardDescription>Choisissez votre période de stationnement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Heure de début
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    data-testid="input-start-time"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Heure de fin
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    data-testid="input-end-time"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Résumé du prix</CardTitle>
                <CardDescription>Détails de votre réservation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Tarif horaire</span>
                  <span className="font-semibold">{pricePerHour} MAD/h</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Durée</span>
                  <span className="font-semibold" data-testid="text-duration">
                    {duration > 0 ? `${duration.toFixed(1)} heures` : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-primary/10 rounded-md px-4">
                  <span className="font-bold text-lg">
                    <DollarSign className="inline h-5 w-5 mr-1" />
                    Total
                  </span>
                  <span className="font-bold text-2xl text-primary" data-testid="text-total">
                    {totalPrice > 0 ? `${totalPrice.toFixed(2)} MAD` : "-"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!startTime || !endTime || duration <= 0}
              data-testid="button-confirm-payment"
            >
              Payer et Confirmer
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
