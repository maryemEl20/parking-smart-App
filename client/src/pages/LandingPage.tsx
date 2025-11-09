import { Link } from "wouter";
import { Car, CreditCard, Lock, Clock, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/DarkModeToggle";
import heroImage from "@assets/generated_images/Parking_lot_hero_image_d3674b1c.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/90 border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-primary">
            <Car className="h-8 w-8" />
            <span className="text-2xl font-bold">SmartPark</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/client-signin">
              <Button variant="outline">Client</Button>
            </Link>
            <Link href="/admin-login">
              <Button variant="default">Admin</Button>
            </Link>
       {/* <DarkModeToggle /> */}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-down">
            Bienvenue à SmartPark
          </h1>
          <p className="text-2xl md:text-3xl mb-8 animate-fade-in-up">
            Votre parking intelligent et sécurisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/client-signin">
             <Button size="lg">
              Réserver une place
            </Button>
            </Link>
            <Link href="/admin-login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Accès Admin
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature Card */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
              <CreditCard className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Paiement sécurisé</h3>
              <p>Réglez votre place facilement via différents modes de paiement.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
              <Lock className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accès par code</h3>
              <p>Recevez un code unique pour ouvrir la barrière et accéder au parking.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
              <Clock className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gestion en temps réel</h3>
              <p>Visualisez l’état des places en temps réel et planifiez vos réservations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-white shadow hover:shadow-lg transition">
              <Mail className="mx-auto h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">contact@smartpark.ma</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow hover:shadow-lg transition">
              <Phone className="mx-auto h-10 w-10 text-green-600 mb-4" />
              <h3 className="font-semibold mb-2">Téléphone</h3>
              <p className="text-muted-foreground">+212 566 46 39 02</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow hover:shadow-lg transition">
              <MapPin className="mx-auto h-10 w-10 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Adresse</h3>
              <p className="text-muted-foreground">Casablanca, Maroc</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-primary">
            <Car className="h-6 w-6" />
            <span className="font-semibold">SmartPark © 2025</span>
          </div>
          <div className="flex gap-4">
            <Facebook className="h-5 w-5" />
            <Twitter className="h-5 w-5" />
            <Instagram className="h-5 w-5" />
          </div>
        </div>
      </footer>
    </div>
  );
}
