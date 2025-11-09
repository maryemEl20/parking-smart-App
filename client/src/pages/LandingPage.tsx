import { Link } from "wouter";
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/DarkModeToggle";
import heroImage from "@assets/generated_images/Parking_lot_hero_image_d3674b1c.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SmartPark</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/client-signin">
              <Button variant="outline" data-testid="button-client-signin">
                👤 Sign Client
              </Button>
            </Link>
            <Link href="/admin-login">
              <Button variant="default" data-testid="button-admin-signin">
                🔑 Sign Admin
              </Button>
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Bienvenue à SmartPark
          </h1>
          <p className="text-2xl md:text-3xl mb-8">
            Votre parking intelligent
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/client-signin">
              <Button
                size="lg"
                className="bg-primary/90 backdrop-blur-md hover:bg-primary text-primary-foreground"
                data-testid="button-hero-reserve"
              >
                Réserver une place
              </Button>
            </Link>
            <Link href="/admin-login">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
                data-testid="button-hero-admin"
              >
                Accès administrateur
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">contact@smartpark.ma</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Téléphone</h3>
              <p className="text-muted-foreground">+212 5XX-XXXXXX</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Adresse</h3>
              <p className="text-muted-foreground">Casablanca, Maroc</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="font-semibold">SmartPark © 2025</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
