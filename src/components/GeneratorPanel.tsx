"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Settings2, Sparkles, ChevronDown, Loader2 } from "lucide-react";
import { Period } from "@/lib/stats-engine";
import confetti from 'canvas-confetti'; // Import confetti

interface GeneratorPanelProps {
  onGenerate: (config: any) => void;
  isLoading: boolean;
}

const GeneratorPanel = ({ onGenerate, isLoading }: GeneratorPanelProps) => {
  const [tickets, setTickets] = useState([3]);
  const [period, setPeriod] = useState<Period>("2y");
  const [recent, setRecent] = useState("50");
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = () => {
    // Trigger confetti effect here
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#34D399', '#10B981', '#059669', '#FFD700'], // Green and gold
      shapes: ['circle', 'square'], // Simple shapes for confetti
      scalar: 0.8,
    });
    onGenerate({
      tickets: tickets[0],
      period,
      recent: parseInt(recent) || 50,
      weights: { all: 0.7, recent: 0.3 }
    });
  };

  return (
    <Card className="glass-panel border-white/10 shadow-2xl gold-glow"> {/* Added gold-glow */}
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />
          Engine Configuratie
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-white">Aantal Tickets</Label>
            <span className="text-primary font-bold text-lg">{tickets[0]}</span>
          </div>
          <Slider 
            value={tickets} 
            onValueChange={setTickets} 
            max={10} 
            min={1} 
            step={1}
            className="py-4 [&>span:first-child]:bg-primary [&>span:first-child]:shadow-lg [&>span:first-child]:shadow-primary/30" /* Custom slider styling */
          />
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between text-muted-foreground hover:text-white hover:bg-white/10 px-2 rounded-xl"> {/* Added rounded-xl */}
              <div className="flex items-center gap-2">
                <Settings2 size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Geavanceerde Instellingen</span>
              </div>
              <ChevronDown size={16} className={isOpen ? "rotate-180 transition-transform" : "transition-transform"} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-6 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Analyse Periode</Label>
                <Select value={period} onValueChange={(v: Period) => setPeriod(v)}>
                  <SelectTrigger className="bg-secondary/50 border-white/10 rounded-xl text-white hover:border-primary/50 transition-colors"> {/* Refined styling */}
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl bg-card border-white/10"> {/* Refined styling */}
                    <SelectItem value="6m">Laatste 6 Maanden</SelectItem>
                    <SelectItem value="1y">Laatste Jaar</SelectItem>
                    <SelectItem value="2y">Laatste 2 Jaar</SelectItem>
                    <SelectItem value="all">Alle Historie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Recentheidsvenster</Label>
                <Input 
                  type="number" 
                  value={recent} 
                  onChange={(e) => setRecent(e.target.value)}
                  className="bg-secondary/50 border-white/10 rounded-xl text-white focus:border-primary/50 transition-colors" /* Refined styling */
                  min={10}
                  max={200}
                />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5"> {/* Changed to rounded-xl */}
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Gewichtsverdeling</span>
                <span className="text-primary">70% Hist / 30% Rec</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button 
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-7 rounded-xl text-lg gold-glow transition-all active:scale-[0.98]"
        >
          {isLoading ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            "GENEREER GELUKSTICKETEN"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GeneratorPanel;