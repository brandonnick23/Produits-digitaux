import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState({ name: "Brandon Nick", email: "brandon@example.com" });
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', link: '', price: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (form.name && form.link && form.price) {
      setProducts([...products, { ...form, id: Date.now() }]);
      setForm({ name: '', link: '', price: '' });
    }
  };
    return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 text-blue-900">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Brandon Nick - Digital Product Manager</h1>
        <p className="text-lg mt-2">Stockez, vendez et analysez vos produits digitaux avec l'IA</p>
      </header>

      <div className="flex justify-center mb-6">
        <Avatar>
          <AvatarImage src="https://avatar.iran.liara.run/public/brandon?size=128" alt="User" />
          <AvatarFallback>BN</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>

      <Tabs defaultValue="products" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 gap-2">
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="analytics">Analytique</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Card className="mt-4">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Ajouter un nouveau produit</h2>
              <div className="flex flex-col gap-4">
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Nom du produit" />
                <Input name="link" value={form.link} onChange={handleChange} placeholder="Lien de téléchargement" />
                <Input name="price" value={form.price} onChange={handleChange} placeholder="Prix (en FCFA)" />
                <Button onClick={handleAddProduct}>Ajouter</Button>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((prod) => (
              <Card key={prod.id}>
                <CardContent>
                  <h3 className="font-bold text-xl">{prod.name}</h3>
                  <p className="text-sm text-blue-700">{prod.link}</p>
                  <p className="font-medium">{prod.price} FCFA</p>
                  <Button variant="secondary" className="mt-2">Acheter (automatique)</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="mt-4">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Performance des Produits</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { name: "Semaine 1", taux: 60 },
                  { name: "Semaine 2", taux: 75 },
                  { name: "Semaine 3", taux: 90 },
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="taux" stroke="#1e3a8a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="mt-4">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
              <div className="space-y-4">
                <Input placeholder="Clé API IA (pour analyse de produit)" />
                <Input placeholder="Méthodes de paiement (Stripe, PayPal, Mobile Money...)" />
                <Button>Enregistrer les paramètres</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
