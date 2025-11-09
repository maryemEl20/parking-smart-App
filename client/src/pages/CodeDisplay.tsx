import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { Car, Clock, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function CodeDisplay() {
  const params = useParams();
  const spotId = params.spotId || "1";
  const [, setLocation] = useLocation();
  const [accessCode, setAccessCode] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(900);

  useEffect(() => {
    const code = localStorage.getItem("accessCode") || "12345";
    setAccessCode(code);

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Key className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <CardTitle className="text-3xl">Paiement réussi !</CardTitle>
              <CardDescription className="text-lg">
                Votre place {spotId} est réservée
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <p className="text-muted-foreground mb-4">Votre code d'accès</p>
                <div className="bg-primary/10 rounded-lg p-8 border-2 border-dashed border-primary/30">
                  <p className="text-6xl font-mono font-bold tracking-wider text-primary" data-testid="text-access-code">
                    {accessCode}
                  </p>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Temps avant le début</span>
                </div>
                <p className="text-3xl font-bold" data-testid="text-countdown">
                  {formatTime(timeRemaining)}
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 text-left space-y-3">
                <h3 className="font-semibold text-lg mb-4">Instructions</h3>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <p className="text-muted-foreground">
                    Rendez-vous à l'entrée du parking
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <p className="text-muted-foreground">
                    Entrez le code sur le clavier numérique
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <p className="text-muted-foreground">
                    La barrière s'ouvrira automatiquement
                  </p>
                </div>
              </div>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation("/parking")}
                data-testid="button-return-client"
              >
                Retour à la page Client
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
