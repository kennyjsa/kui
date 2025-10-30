"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Rating,
  ColorPicker,
  FileUpload,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  CurrencyInput,
  MaskedInput,
} from "@kui-framework/ui";
import { PageWrapper } from "@/components/PageWrapper";

export default function BasicComponentsPage() {
  const [rating, setRating] = useState(0);
  const [color, setColor] = useState("#3b82f6");
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({
    terms: false,
    newsletter: false,
    notifications: false,
  });
  const [radioValue, setRadioValue] = useState("option1");
  const [currencyValue, setCurrencyValue] = useState<number | null>(null);
  const [maskedValue, setMaskedValue] = useState("");

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setCheckboxValues(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <PageWrapper
      title="Componentes Básicos"
      description="Demonstração de todos os componentes básicos do KUI Framework com suas variações"
    >
      <div className="space-y-8">
        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Botões</CardTitle>
            <CardDescription>Diferentes variações e tamanhos de botões</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Inputs Section */}
        <Card>
          <CardHeader>
            <CardTitle>Campos de Entrada</CardTitle>
            <CardDescription>Inputs, textareas e campos especiais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basic-input">Input Básico</Label>
                <Input id="basic-input" placeholder="Digite algo..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-input">Email</Label>
                <Input id="email-input" type="email" placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-input">Senha</Label>
                <Input id="password-input" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency-input">Valor Monetário</Label>
                <CurrencyInput
                  id="currency-input"
                  value={currencyValue || undefined}
                  onChange={setCurrencyValue}
                  placeholder="R$ 0,00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="masked-input">CPF</Label>
                <MaskedInput
                  id="masked-input"
                  mask="999.999.999-99"
                  value={maskedValue}
                  onChange={setMaskedValue}
                  placeholder="000.000.000-00"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea id="textarea" placeholder="Digite uma mensagem..." rows={4} />
            </div>
          </CardContent>
        </Card>

        {/* Select and Options Section */}
        <Card>
          <CardHeader>
            <CardTitle>Seleção e Opções</CardTitle>
            <CardDescription>Selects, checkboxes, radio buttons e switches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Select</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Opção 1</SelectItem>
                  <SelectItem value="option2">Opção 2</SelectItem>
                  <SelectItem value="option3">Opção 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Checkboxes</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={checkboxValues.terms}
                    onCheckedChange={(checked) => handleCheckboxChange("terms", checked as boolean)}
                  />
                  <Label htmlFor="terms">Aceito os termos de uso</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={checkboxValues.newsletter}
                    onCheckedChange={(checked) => handleCheckboxChange("newsletter", checked as boolean)}
                  />
                  <Label htmlFor="newsletter">Receber newsletter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifications"
                    checked={checkboxValues.notifications}
                    onCheckedChange={(checked) => handleCheckboxChange("notifications", checked as boolean)}
                  />
                  <Label htmlFor="notifications">Notificações por email</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Radio Group</Label>
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label htmlFor="r1">Opção 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label htmlFor="r2">Opção 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="r3" />
                  <Label htmlFor="r3">Opção 3</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="switch"
                  checked={switchValue}
                  onCheckedChange={setSwitchValue}
                />
                <Label htmlFor="switch">Ativar notificações</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Components Section */}
        <Card>
          <CardHeader>
            <CardTitle>Componentes Interativos</CardTitle>
            <CardDescription>Rating, color picker e file upload</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Avaliação</Label>
              <Rating
                value={rating}
                onChange={setRating}
                max={5}
              />
              <p className="text-sm text-muted-foreground">
                Avaliação: {rating} estrelas
              </p>
            </div>

            <div className="space-y-2">
              <Label>Seletor de Cor</Label>
              <ColorPicker
                value={color}
                onChange={setColor}
                className="w-fit"
              />
              <p className="text-sm text-muted-foreground">
                Cor selecionada: {color}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Upload de Arquivo</Label>
              <FileUpload
                accept="image/*"
                maxSize={5 * 1024 * 1024} // 5MB
                onChange={(file) => console.log("Arquivo selecionado:", file)}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Badges and Status Section */}
        <Card>
          <CardHeader>
            <CardTitle>Badges e Status</CardTitle>
            <CardDescription>Diferentes tipos de badges e indicadores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="bg-green-500">Sucesso</Badge>
              <Badge variant="default" className="bg-yellow-500">Atenção</Badge>
              <Badge variant="default" className="bg-red-500">Erro</Badge>
              <Badge variant="default" className="bg-blue-500">Info</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Loading States Section */}
        <Card>
          <CardHeader>
            <CardTitle>Estados de Carregamento</CardTitle>
            <CardDescription>Skeletons e indicadores de loading</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Skeleton - Texto</Label>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Skeleton - Card</Label>
              <div className="flex space-x-4">
                <Skeleton className="h-20 w-20 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[160px]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Example */}
        <Card>
          <CardHeader>
            <CardTitle>Exemplo de Formulário Completo</CardTitle>
            <CardDescription>Demonstração de um formulário usando vários componentes</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea id="message" placeholder="Sua mensagem..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Geral</SelectItem>
                    <SelectItem value="support">Suporte</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="agree" />
                <Label htmlFor="agree">Concordo com os termos de uso</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
                <Button type="submit">
                  Enviar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
