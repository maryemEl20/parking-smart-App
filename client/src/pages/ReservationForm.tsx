import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { Car, Clock, DollarSign, ArrowLeft, Calendar } from "lucide-react";
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

  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const pricePerHour = 10;

  const calculateDuration = () => {
    if (!startDateTime || !endDateTime) return 0;
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return Math.max(0, hours);
  };

  const duration = calculateDuration();
  const totalPrice = duration * pricePerHour;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDateTime || !endDateTime) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner la date et l'heure de début et de fin",
        variant: "destructive",
      });
      return;
    }

    if (duration <= 0) {
      toast({
        title: "Erreur",
        description: "La date/heure de fin doit être après la date/heure de début",
        variant: "destructive",
      });
      return;
    }

    const reservation = {
      spotId,
      startDateTime,
      endDateTime,
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
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SmartPark</span>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Bouton retour */}
          <div className="mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/parking")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Retour aux places
            </Button>
          </div>

          {/* Titre */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Réservation - Place {spotId}</h1>
            <p className="text-muted-foreground">Choisissez votre période et confirmez</p>
          </div>

          {/* Grille horaires / résumé */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Horaires */}
            <Card>
              <CardHeader>
                <CardTitle>Date et Heure</CardTitle>
                <CardDescription>Sélectionnez vos dates et heures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startDateTime">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Date et heure de début
                  </Label>
                  <Input
                    id="startDateTime"
                    type="datetime-local"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                    data-testid="input-start-datetime"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDateTime">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Date et heure de fin
                  </Label>
                  <Input
                    id="endDateTime"
                    type="datetime-local"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                    data-testid="input-end-datetime"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Résumé prix */}
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

          {/* Bouton confirmer */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!startDateTime || !endDateTime || duration <= 0}
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
