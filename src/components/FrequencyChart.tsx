"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FrequencyData } from "@/lib/stats-engine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface FrequencyChartProps {
  data: FrequencyData[];
  title: string;
  color: string;
}

const FrequencyChart = ({ data, title, color }: FrequencyChartProps) => {
  return (
    <Card className="border-none bg-card/50 backdrop-blur-sm shadow-lg rounded-2xl"> {/* Added rounded-2xl */}
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-wider"> {/* Adjusted text color */}
          <BarChart3 size={16} className="text-primary" /> {/* Added primary color to icon */}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="value" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                interval={data.length > 12 ? 4 : 0}
                stroke="hsl(var(--muted-foreground))" /* Adjusted axis color */
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }} /* Adjusted tooltip cursor color */
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  fontSize: '12px',
                  backgroundColor: 'hsl(var(--card))', /* Adjusted tooltip background */
                  color: 'hsl(var(--foreground))' /* Adjusted tooltip text color */
                }}
                labelFormatter={(value) => `Getal: ${value}`}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="hsl(var(--primary))" fillOpacity={0.6 + (entry.count / Math.max(...data.map(d => d.count))) * 0.4} /> /* Changed fill to primary color */
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FrequencyChart;