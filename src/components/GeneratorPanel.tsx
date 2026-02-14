"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Settings2, Sparkles, ChevronDown, Loader2, Gauge } from "lucide-react";
import { Period } from "@/lib/stats-engine";

interface GeneratorPanelProps {
  onGenerate: (config: any) => void;
  isLoading: boolean;
}

const GeneratorPanel = ({ onGenerate, isLoading }: GeneratorPanelProps) => {
  const [tickets, setTickets] = useState([3]);
  const [period, setPeriod] = useState<Period>("2y");
  const [recent, setRecent] = useState("50");
  const [riskFactor, setRiskFactor] = useState([1.5]); // Default Balanced
  const [isOpen, setIsOpen] = useState(false);

  const getRiskLabel = (val: number) => {
    if (val > 2.5) return { label: "Conservatief", color: "text-blue-400" };
    if (val < 0.8) return { label: "Avontuurlijk", color: "text-orange-400" };
    return { label: "Gebalanceerd", color: "text-emerald" };
  };

  const riskInfo = getRiskLabel(riskFactor[0]);

  const handleGenerate = () => {
    onGenerate({
      tickets: tickets[0],
      period,
      recent: parseInt(recent) || 50,
      riskFactor: riskFactor[0],
      weights: { all: 0.7, recent: 0.3 }
    });
  };

  return (
    <Card className="bg-card border border-border/20 shadow-xl rounded-lg">
      <CardHeader className="pb-4 border-b border-border/20">
        <CardTitle className="text-xs font-bold uppercase tracking-extra-wide text-muted-foreground flex items-center gap-2 text-small-caps">
          <Sparkles size={16} className="text-emerald" />
          Engine Configuratie
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-foreground">Aantal Tickets</Label>
            <span className="text-emerald font-bold text-lg">{tickets[0]}</span>
          </div>
          <Slider 
            value={tickets} 
            onValueChange={setTickets} 
            max={10} 
            min={1} 
            step={1}
            className="py-4 [&>span:first-child]:bg-emerald [&>span:first-child]:shadow-lg [&>span:first-child]:shadow-emerald/30 [&>span:first-child]:border-emerald-hover [&>span:first-child]:rounded-full [&>[data-radix-slider-track]]:bg-border/30 [&>[data-radix-slider-track]]:h-2 [&>[data-radix-slider-track]]:rounded-full"
          />
        </div>

        {/* New Strategy Section */}
        <div className="space-y-4 p-4 rounded-md bg-card/50 border border-border/20">
           <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
               <Gauge size={16} className="text-muted-foreground" />
               <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-small-caps">Strategie Profiel</Label>
            </div>
            <span className={`text-xs font-bold ${riskInfo.color} uppercase tracking-wider`}>{riskInfo.label}</span>
          </div>
          <Slider 
            value={riskFactor} 
            onValueChange={setRiskFactor} 
            max={4.0} 
            min={0.5} 
            step={0.1}
            className="[&>span:first-child]:bg-foreground [&>span:first-child]:border-foreground [&>[data-radix-slider-track]]:bg-border/30"
          />
          <p className="text-[10px] text-muted-foreground italic text-center">
            {riskFactor[0] > 2.5 ? "Focus op hoogste waarschijnlijkheid." : riskFactor[0] < 0.8 ? "Verhoogt variantie voor zeldzame combinaties." : "Optimale balans tussen statistiek en kans."}
          </p>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between text-secondary-foreground hover:text-foreground hover:bg-card/50 px-3 rounded-md transition-colors duration-120">
              <div className="flex items-center gap-2">
                <Settings2 size={16} />
                <span className="text-xs font-bold uppercase tracking-wider text-small-caps">Geavanceerde Instellingen</span>
              </div>
              <ChevronDown size={16} className={isOpen ? "rotate-180 transition-transform duration-300" : "transition-transform duration-300"} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-6 pt-4 border-t border-border/20 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider text-small-caps">Analyse Periode</Label>
                <Select value={period} onValueChange={(v: Period) => setPeriod(v)}>
                  <SelectTrigger className="bg-input border-border/20 rounded-md text-foreground hover:border-emerald/50 transition-colors duration-120 focus:ring-1 focus:ring-emerald focus:ring-offset-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-md bg-card border-border/20 text-foreground">
                    <SelectItem value="6m">Laatste 6 Maanden</SelectItem>
                    <SelectItem value="1y">Laatste Jaar</SelectItem>
                    <SelectItem value="2y">Laatste 2 Jaar</SelectItem>
                    <SelectItem value="all">Alle Historie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider text-small-caps">Recentheidsvenster</Label>
                <Input 
                  type="number" 
                  value={recent} 
                  onChange={(e) => setRecent(e.target.value)}
                  className="bg-input border-border/20 rounded-md text-foreground focus:border-emerald/50 transition-colors duration-120 focus:ring-1 focus:ring-emerald focus:ring-offset-0"
                  min={10}
                  max={200}
                />
              </div>
            </div>
            
             <div className="space-y-2 pt-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-small-caps">Actieve Wiskundige Filters</Label>
                <div className="flex flex-wrap gap-2">
                  {['Somkromme', 'Pariteitsbalans', 'Bereikspreiding', 'Clusterpreventie'].map(filter => (
                    <span key={filter} className="text-[10px] px-2 py-1 rounded bg-emerald/10 text-emerald border border-emerald/20">
                      {filter}
                    </span>
                  ))}
                </div>
             </div>
          </CollapsibleContent>
        </Collapsible>

        <Button 
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-emerald hover:bg-emerald-hover text-primary-foreground font-bold py-4 px-6 sm:py-7 sm:px-8 rounded-md text-base sm:text-lg emerald-glow transition-all duration-120 active:scale-[0.98]"
          style={{ boxShadow: '0 4px 15px rgba(0, 200, 83, 0.4), 0 1px 5px rgba(0, 200, 83, 0.2)' }} 
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