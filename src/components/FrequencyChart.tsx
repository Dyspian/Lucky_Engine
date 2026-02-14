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
    <Card className="border-none bg-white/50 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-500 uppercase tracking-wider">
          <BarChart3 size={16} />
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
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  fontSize: '12px'
                }}
                labelFormatter={(value) => `Getal: ${value}`}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={color} fillOpacity={0.6 + (entry.count / Math.max(...data.map(d => d.count))) * 0.4} />
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