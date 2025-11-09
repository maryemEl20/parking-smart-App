// src/pages/VerifyEmail.tsx
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [code, setCode] = useState("");

  // Simuler le code envoyé
  const verificationCode = "123456";

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === verificationCode) {
      toast({
        title: "Email vérifié !",
        description: "Vous pouvez maintenant accéder au parking",
      });
      setTimeout(() => setLocation("/parking"), 1000);
    } else {
      toast({
        title: "Erreur",
        description: "Code incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <DarkModeToggle /> {/**/}
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Vérification Email</CardTitle>
          <CardDescription>Entrez le code reçu sur votre email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <Input
              placeholder="Code de vérification"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button type="submit" className="w-full">Vérifier</Button>
          </form>

          <div className="mt-4 text-center">
            <Button variant="ghost" onClick={() => setLocation("/client-signin")}>
              ← Retour
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
