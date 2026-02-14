"use client";

import React from 'react';
import { Info, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface StatsInfoProps {
  explanation: string;
}

const StatsInfo = ({ explanation }: StatsInfoProps) => {
  return (
    <Alert className="bg-indigo-50 border-indigo-100 text-indigo-900 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-indigo-600 rounded-full text-white shrink-0">
          <Sparkles size={20} />
        </div>
        <div>
          <AlertTitle className="text-lg font-bold mb-2 flex items-center gap-2">
            Hoe de Lucky Engine werkt
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