//dependencies
import { useState, useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
// material
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
//
import  BaseOptionChart  from './BaseOptionChart';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits({workoutStatus}) {

  const CHART_DATA = [
    {
      name: 'NOT STARTED',
      type: 'column',
      data: workoutStatus?.filter(a => {return a.status=='NOT STARTED' }).map(a => a.count)
    },
    {
      name: 'ONGOING',
      type: 'area',
      data: workoutStatus?.filter(a => {return a.status=='COMPLETED' }).map(a => a.count)
    },
    {
      name: 'COMPLETED',
      type: 'line',
      data: workoutStatus?.filter(a => {return a.status=='COMPLETED' }).map(a => a.count)
    }
  ];

  useEffect(()=>{
    // console.log(workoutStatus?.filter(a => {return a.status=='NOT STARTED' }).map(a => a.count));
    // console.log(workoutStatus?.filter(a => {return a.status=='ONGOING' }).map(a => a.count));
    // console.log(workoutStatus?.filter(a => {return a.status=='COMPLETED' }).map(a => a.count));
    console.log(workoutStatus?.map(a => a.startDate_js))
  },[])

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: workoutStatus?.map(a => a.startDate_js),
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="How fit are you?" subheader="Update your tracker for accurate charts." />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} width={800} />
      </Box>
    </Card>
  );
}
