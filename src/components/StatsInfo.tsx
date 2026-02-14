"use client";

import React from 'react';
import { Info, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Logo from './Logo'; // Import the Logo component

interface StatsInfoProps {
  explanation: string;
}

const StatsInfo = ({ explanation }: StatsInfoProps) => {
  const logoUrl = "https://jxysvqcivgshyhkquoib.supabase.co/storage/v1/object/public/logo/lucky_engine.png";

  return (
    <Alert className="bg-indigo-50 border-indigo-100 text-indigo-900 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-indigo-600 rounded-full text-white shrink-0">
          <Info size={20} /> {/* Changed to Info icon for general info */}
        </div>
        <div>
          <AlertTitle className="text-lg font-bold mb-2 flex items-center gap-2">
            <Logo imgClassName="h-6 w-auto" imageUrl={logoUrl} /> {/* Your logo here */}
          </AlertTitle>
          <AlertDescription className="text-indigo-800/80 leading-relaxed whitespace-pre-line">
            {explanation}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default StatsInfo;