import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { componentStyles } from '../../../theme';

const DistanceChart = () => {
  const ds = componentStyles.geoPage.dashboard;
  
  const distanceData = [
    { name: '12 May', distance: 75 },
    { name: '13 May', distance: 50 },
    { name: '14 May', distance: 70 },
    { name: '15 May', distance: 68 },
    { name: '16 May', distance: 120 },
    { name: '17 May', distance: 75 },
    { name: '18 May', distance: 10 },
  ];

  return (
    <div className={ds.chart.container}>
      <div className={ds.chart.header}>
        <div>
          <h2 className={ds.chart.title}>Distance Travelled</h2>
          <p className={ds.chart.subtitle}>See the distance travelled by your employees for the selected time frame</p>
        </div>
        <div className={ds.chart.controls}>
          <select className={ds.chart.select}>
            <option>All Staff</option>
          </select>
          <select className={ds.chart.select}>
            <option>Last 7 days</option>
          </select>
          <div className={ds.chart.dateRange}>
            12 May '25 - 18 May '25
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div className={ds.chart.chartHeight}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={distanceData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Km', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className={ds.chart.customTooltip}>
                      Total Distance: {payload[0].value.toFixed(2)} Km
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="distance" fill="#e9d5ff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-end mt-2">
        <div className={ds.chart.totalBadge}>
          Total Distance: 119.49 Km
        </div>
      </div>
    </div>
  );
};

export default DistanceChart;