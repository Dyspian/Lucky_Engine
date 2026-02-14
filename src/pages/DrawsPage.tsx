// src/pages/DrawsPage.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEuromillionsDraws, EuromillionsQueryParamsBaseSchema, EuromillionsQueryParams, DataUnavailableError } from "@/services/euromillions";
import { Draw } from "@/lib/euromillions/schemas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Import Footer
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, Search, Loader2, Bug } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { showSuccess, showError } from "@/utils/toast";
import DrawCard from "@/components/draws/DrawCard";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundGrid from "@/components/BackgroundGrid";
import BackgroundCanvas from "@/components/BackgroundCanvas";

// Extend the base query schema for form validation
const FilterFormSchema = EuromillionsQueryParamsBaseSchema.extend({
  year: z.string().optional(), // Year as string for select input
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format.").optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format.").optional(),
});

type FilterFormData = z.infer<typeof FilterFormSchema>;

const DrawsPage = () => {
  const [queryParams, setQueryParams] = useState<EuromillionsQueryParams>({});
  const [isDevMode, setIsDevMode] = useState(import.meta.env.MODE !== 'production');

  const { data: draws, isLoading, isError, error, refetch } = useQuery<Draw[], DataUnavailableError, Draw[], (string | EuromillionsQueryParams)[]>({
    queryKey: ['euromillionsDraws', queryParams],
    queryFn: () => getEuromillionsDraws(queryParams),
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
  });

  // Handle errors via useEffect since onError is removed in v5
  useEffect(() => {
    if (isError && error) {
      console.error("Error fetching draws in DrawsPage:", error);
      showError(`Fout bij het laden van trekkingen: ${error.message}`);
    }
  }, [isError, error]);

  const form = useForm<FilterFormData>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      year: undefined,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = form;
  const watchedYear = watch('year');
  const watchedStartDate = watch('startDate');
  const watchedEndDate = watch('endDate');

  const onSubmit = (data: FilterFormData) => {
    const newParams: EuromillionsQueryParams = {
      year: data.year ? parseInt(data.year) : undefined,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    setQueryParams(newParams);
    showSuccess("Filters toegepast!");
  };

  const applyPreset = (preset: 'thisYear' | 'last30Days' | 'all2023') => {
    const today = new Date();
    let newStartDate: Date | undefined;
    let newEndDate: Date | undefined;
    let newYear: string | undefined;

    switch (preset) {
      case 'thisYear':
        newStartDate = new Date(today.getFullYear(), 0, 1);
        newEndDate = today;
        newYear = today.getFullYear().toString();
        break;
      case 'last30Days':
        newStartDate = subDays(today, 30);
        newEndDate = today;
        newYear = undefined;
        break;
      case 'all2023':
        newStartDate = new Date(2023, 0, 1);
        newEndDate = new Date(2023, 11, 31);
        newYear = '2023';
        break;
    }

    setValue('year', newYear);
    setValue('startDate', newStartDate ? format(newStartDate, 'yyyy-MM-dd') : undefined);
    setValue('endDate', newEndDate ? format(newEndDate, 'yyyy-MM-dd') : undefined);
    
    handleSubmit(onSubmit)(); // Trigger form submission with new values
  };

  // Generate years for the select dropdown (e.g., from 2004 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2004 + 1 }, (_, i) => (currentYear - i).toString());

  return (
    <div className="relative min-h-screen text-foreground selection:bg-emerald/30 font-sans">
      <BackgroundGrid />
      <BackgroundCanvas />
      <div className="radial-spotlight" />

      <Navbar />
      
      <main className="container mx-auto px-6 py-8 md:py-12 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
        >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-extra-wide text-foreground mb-4">
              EuroMillions <span className="text-emerald">Archief</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                Bekijk de volledige geschiedenis van trekkingsresultaten. Filter op datum of jaar om specifieke patronen te analyseren.
            </p>
        </motion.div>

        {isDevMode && (
          <Card className="mb-8 bg-red-900/20 border border-red-700/50 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-red-400 uppercase tracking-extra-wide text-small-caps">
                <Bug size={16} /> Ontwikkelings Debug Paneel
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-red-200 space-y-2">
              <p><strong>Huidige Query Parameters:</strong> {JSON.stringify(queryParams)}</p>
              <p><strong>Laadstatus:</strong> {isLoading ? "Laden..." : "Voltooid"}</p>
              {isError && <p><strong>Fout:</strong> {error?.message}</p>}
              <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2 text-red-200 border-red-700/50 hover:bg-red-800/30">
                Handmatig Herladen
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filter Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
              <Card className="bg-card border border-border/20 shadow-xl rounded-lg sticky top-24 h-fit">
                <CardHeader className="pb-4 border-b border-border/20">
                  <CardTitle className="text-xs font-bold uppercase tracking-extra-wide text-muted-foreground flex items-center gap-2 text-small-caps">
                    <Filter size={16} className="text-emerald" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-xs text-muted-foreground uppercase tracking-wider text-small-caps">Jaar</Label>
                      <Select onValueChange={(val) => setValue('year', val)} value={watchedYear}>
                        <SelectTrigger id="year" className="bg-input border-border/20 rounded-md text-foreground hover:border-emerald/50 transition-colors duration-120 focus:ring-1 focus:ring-emerald focus:ring-offset-0">
                          <SelectValue placeholder="Selecteer jaar" />
                        </SelectTrigger>
                        <SelectContent className="rounded-md bg-card border-border/20 text-foreground h-60">
                          <SelectItem value="">Alle Jaren</SelectItem>
                          {years.map(y => (
                            <SelectItem key={y} value={y}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider text-small-caps">Datum Bereik</Label>
                      <div className="flex flex-col gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal bg-input border-border/20 rounded-md text-foreground hover:border-emerald/50 transition-colors duration-120 focus:ring-1 focus:ring-emerald focus:ring-offset-0",
                                !watchedStartDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {watchedStartDate ? format(new Date(watchedStartDate), "PPP") : <span>Start Datum</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-card border-border/20 rounded-md">
                            <Calendar
                              mode="single"
                              selected={watchedStartDate ? new Date(watchedStartDate) : undefined}
                              onSelect={(date) => setValue('startDate', date ? format(date, 'yyyy-MM-dd') : undefined)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal bg-input border-border/20 rounded-md text-foreground hover:border-emerald/50 transition-colors duration-120 focus:ring-1 focus:ring-emerald focus:ring-offset-0",
                                !watchedEndDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {watchedEndDate ? format(new Date(watchedEndDate), "PPP") : <span>Eind Datum</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-card border-border/20 rounded-md">
                            <Calendar
                              mode="single"
                              selected={watchedEndDate ? new Date(watchedEndDate) : undefined}
                              onSelect={(date) => setValue('endDate', date ? format(date, 'yyyy-MM-dd') : undefined)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {(errors.startDate || errors.endDate) && (
                        <p className="text-red-500 text-xs mt-1">{errors.startDate?.message || errors.endDate?.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider text-small-caps">Snelle Voorinstellingen</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button type="button" variant="outline" onClick={() => applyPreset('thisYear')} className="bg-input border-border/20 text-secondary-foreground hover:bg-card/50 hover:text-foreground hover:border-emerald/50 text-xs">Dit Jaar</Button>
                        <Button type="button" variant="outline" onClick={() => applyPreset('last30Days')} className="bg-input border-border/20 text-secondary-foreground hover:bg-card/50 hover:text-foreground hover:border-emerald/50 text-xs">30 Dagen</Button>
                        <Button type="button" variant="outline" onClick={() => applyPreset('all2023')} className="col-span-2 bg-input border-border/20 text-secondary-foreground hover:bg-card/50 hover:text-foreground hover:border-emerald/50 text-xs">Archief 2023</Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-emerald hover:bg-emerald-hover text-primary-foreground font-bold py-6 rounded-md emerald-glow transition-all duration-120 active:scale-[0.98]">
                      <Search size={16} className="mr-2" /> TOEPASSEN
                    </Button>
                  </form>
                </CardContent>
              </Card>
          </motion.div>

          {/* Draw Stream List */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 text-muted-foreground bg-card/30 rounded-lg border border-border/10">
                <Loader2 className="h-12 w-12 animate-spin text-emerald mb-4" />
                <p className="text-sm uppercase tracking-widest text-small-caps animate-pulse">Trekkingen Laden...</p>
              </div>
            ) : isError ? (
              <div className="text-center py-16 bg-red-900/10 border border-red-700/30 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-red-400 mb-4">Fout bij het laden van trekkingen</h2>
                <p className="text-red-200/80">{error?.message || "Er is een onbekende fout opgetreden."}</p>
              </div>
            ) : draws && draws.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {draws.map((draw, i) => (
                    <DrawCard key={draw.id} draw={draw} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="text-center py-24 bg-card/30 border border-border/10 rounded-lg shadow-lg text-muted-foreground flex flex-col items-center justify-center">
                <Filter size={48} className="text-muted-foreground/30 mb-4" />
                <p className="text-lg font-semibold text-foreground">Geen resultaten gevonden</p>
                <p className="text-sm mt-2 max-w-xs mx-auto">Probeer de filters aan te passen om trekkingen uit een andere periode te zien.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DrawsPage;