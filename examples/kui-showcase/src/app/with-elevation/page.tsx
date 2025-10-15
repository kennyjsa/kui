"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@kui/ui";
import { Button } from "@kui/ui";
import { Badge } from "@kui/ui";
import { Tabs } from "@kui/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@kui/ui";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@kui/ui";

export default function ElevationExample() {
  const [elevation, setElevation] = React.useState<0 | 1 | 2 | 3 | 4 | 5>(2);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const tabItems = [
    {
      id: "tab1",
      label: "Elevation 1",
      content: (
        <div className="p-4">
          <p>Conteúdo da aba com elevation 1</p>
        </div>
      ),
    },
    {
      id: "tab2",
      label: "Elevation 2",
      content: (
        <div className="p-4">
          <p>Conteúdo da aba com elevation 2</p>
        </div>
      ),
    },
    {
      id: "tab3",
      label: "Elevation 3",
      content: (
        <div className="p-4">
          <p>Conteúdo da aba com elevation 3</p>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Sistema de Elevation</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Demonstração do sistema de elevation implementado nos componentes KUI,
          seguindo as melhores práticas do Material UI e Atlassian Design System.
        </p>
      </div>

      {/* Controle de Elevation */}
      <Card elevation={3}>
        <CardHeader>
          <CardTitle>Controle de Elevation</CardTitle>
          <CardDescription>
            Use o seletor abaixo para alterar o nível de elevation dos componentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Nível de Elevation:</label>
            <Select value={elevation.toString()} onValueChange={(value) => setElevation(Number(value) as 0 | 1 | 2 | 3 | 4 | 5)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 - Plano</SelectItem>
                <SelectItem value="1">1 - Sutil</SelectItem>
                <SelectItem value="2">2 - Baixo</SelectItem>
                <SelectItem value="3">3 - Médio</SelectItem>
                <SelectItem value="4">4 - Alto</SelectItem>
                <SelectItem value="5">5 - Máximo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Exemplos de Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Cards com Diferentes Elevations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card elevation={1}>
            <CardHeader>
              <CardTitle>Elevation 1</CardTitle>
              <CardDescription>Elevação sutil para elementos de hover</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ideal para elementos que precisam de uma elevação discreta.
              </p>
            </CardContent>
          </Card>

          <Card elevation={2}>
            <CardHeader>
              <CardTitle>Elevation 2</CardTitle>
              <CardDescription>Elevação baixa para cards padrão</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Elevação padrão para a maioria dos cards e elementos.
              </p>
            </CardContent>
          </Card>

          <Card elevation={3}>
            <CardHeader>
              <CardTitle>Elevation 3</CardTitle>
              <CardDescription>Elevação média para elementos destacados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Para elementos que precisam se destacar mais na interface.
              </p>
            </CardContent>
          </Card>

          <Card elevation={4}>
            <CardHeader>
              <CardTitle>Elevation 4</CardTitle>
              <CardDescription>Elevação alta para modais e dialogs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Usado em modais, dialogs e elementos que flutuam sobre o conteúdo.
              </p>
            </CardContent>
          </Card>

          <Card elevation={5}>
            <CardHeader>
              <CardTitle>Elevation 5</CardTitle>
              <CardDescription>Elevação máxima para overlays</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Para elementos que ficam acima de tudo na interface.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Exemplos de Botões */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Botões com Elevation</h2>
        <div className="flex flex-wrap gap-4">
          <Button elevation={1}>Elevation 1</Button>
          <Button elevation={2}>Elevation 2</Button>
          <Button elevation={3}>Elevation 3</Button>
          <Button variant="secondary" elevation={2}>Secondary + Elevation 2</Button>
          <Button variant="destructive" elevation={3}>Destructive + Elevation 3</Button>
        </div>
      </div>

      {/* Exemplos de Badges */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Badges com Elevation</h2>
        <div className="flex flex-wrap gap-4">
          <Badge elevation={1}>Elevation 1</Badge>
          <Badge elevation={2}>Elevation 2</Badge>
          <Badge elevation={3}>Elevation 3</Badge>
          <Badge variant="secondary" elevation={2}>Secondary + Elevation 2</Badge>
          <Badge variant="destructive" elevation={3}>Destructive + Elevation 3</Badge>
        </div>
      </div>

      {/* Exemplos de Tabs */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Tabs com Elevation</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Tabs Card com Elevation 2</h3>
            <Tabs
              variant="card"
              elevation={2}
              items={tabItems}
              defaultActiveTab="tab1"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Tabs Pills com Elevation 3</h3>
            <Tabs
              variant="pills"
              elevation={3}
              items={tabItems}
              defaultActiveTab="tab1"
            />
          </div>
        </div>
      </div>

      {/* Exemplos de Dialogs */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Dialogs com Elevation</h2>
        <div className="flex gap-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Abrir Dialog com Elevation 4</Button>
            </DialogTrigger>
            <DialogContent elevation={4}>
              <DialogHeader>
                <DialogTitle>Dialog com Elevation 4</DialogTitle>
                <DialogDescription>
                  Este dialog usa elevation 4, que é o padrão para modais e dialogs.
                  Observe como ele se destaca sobre o overlay de fundo.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  O sistema de elevation garante que elementos importantes como dialogs
                  tenham a hierarquia visual correta na interface.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Demonstração Interativa */}
      <Card elevation={elevation}>
        <CardHeader>
          <CardTitle>Demonstração Interativa</CardTitle>
          <CardDescription>
            Este card usa o nível de elevation selecionado acima
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Elevation atual: <Badge elevation={elevation}>{elevation}</Badge>
            </p>
            <div className="flex gap-2">
              <Button elevation={elevation}>Botão com Elevation {elevation}</Button>
              <Badge elevation={elevation}>Badge com Elevation {elevation}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guia de Uso */}
      <Card elevation={2}>
        <CardHeader>
          <CardTitle>Guia de Uso do Sistema de Elevation</CardTitle>
          <CardDescription>
            Como usar o sistema de elevation nos componentes KUI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Níveis de Elevation:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li><strong>0 - Plano:</strong> Sem elevação, para elementos no mesmo nível</li>
                <li><strong>1 - Sutil:</strong> Para estados de hover e elementos discretos</li>
                <li><strong>2 - Baixo:</strong> Elevação padrão para cards e elementos principais</li>
                <li><strong>3 - Médio:</strong> Para dropdowns, selects e elementos destacados</li>
                <li><strong>4 - Alto:</strong> Para modais, dialogs e elementos flutuantes</li>
                <li><strong>5 - Máximo:</strong> Para overlays e elementos que ficam acima de tudo</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Componentes que Suportam Elevation:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Card - Elevation padrão: 2</li>
                <li>• Dialog/DialogContent - Elevation padrão: 4</li>
                <li>• SelectContent - Elevation padrão: 3</li>
                <li>• Button - Elevation opcional para variantes default, destructive, secondary</li>
                <li>• Badge - Elevation opcional</li>
                <li>• Tabs - Elevation opcional para variantes card e pills</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
