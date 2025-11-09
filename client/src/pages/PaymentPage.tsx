import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { Car, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import DarkModeToggle from "@/components/DarkModeToggle";
import paymentImage from "@assets/generated_images/Luxury_car_payment_page_c3288913.png";

export default function PaymentPage() {
  const params = useParams();
  const spotId = params.spotId || "1";
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    zip: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.cardNumber) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    const accessCode = Math.floor(10000 + Math.random() * 90000).toString();
    localStorage.setItem("accessCode", accessCode);
    
    toast({
      title: "Paiement réussi !",
      description: "Votre code d'accès est généré",
    });
    
    setTimeout(() => {
      setLocation(`/payment-success/${spotId}`);
    }, 1500);
  };

  const paymentMethods = [
    { id: "card", label: "Carte de crédit" },
    { id: "paypal", label: "PayPal" },
    { id: "applepay", label: "Apple Pay" },
    { id: "googlepay", label: "Google Pay" },
  ];

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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Paiement sécurisé</h1>
            <p className="text-muted-foreground">Finalisez votre réservation</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Mode de paiement</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {paymentMethods.map((method) => (
                          <Button
                            key={method.id}
                            type="button"
                            variant={paymentMethod === method.id ? "default" : "outline"}
                            className="w-full"
                            onClick={() => setPaymentMethod(method.id)}
                            data-testid={`button-payment-${method.id}`}
                          >
                            {method.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jean@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          data-testid="input-payment-email"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input
                            id="firstName"
                            placeholder="Jean"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            data-testid="input-first-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom</Label>
                          <Input
                            id="lastName"
                            placeholder="Dupont"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            data-testid="input-last-name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">
                          <CreditCard className="inline h-4 w-4 mr-2" />
                          Numéro de carte
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="4242 4242 4242 4242"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          data-testid="input-card-number"
                        />
                        <p className="text-xs text-muted-foreground">
                          Test: utilisez 4242 4242 4242 4242
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="expiry">Date d'expiration</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            value={formData.expiry}
                            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                            data-testid="input-expiry"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">
                            <Lock className="inline h-3 w-3 mr-1" />
                            CVC
                          </Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                            data-testid="input-cvc"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zip">Code postal</Label>
                        <Input
                          id="zip"
                          placeholder="20000"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          data-testid="input-zip"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" data-testid="button-pay">
                      Payer
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <div
                className="h-full rounded-lg bg-cover bg-center min-h-[400px] relative overflow-hidden"
                style={{ backgroundImage: `url(${paymentImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Paiement sécurisé</h3>
                    <p className="text-white/90">Vos informations sont protégées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
