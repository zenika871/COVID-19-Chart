import Head from 'next/head'
import Dynamic from 'next/dynamic';

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import fetch from 'node-fetch'

const renderLineChart = ({data}) => {
  return <LineChart
    id="lineChart"
    width={1000}
    height={500}
    data={data}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}

  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" width={500} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="confirmed" stroke="#8884d8" activeDot={{ r: 8 }} />
    <Line type="monotone" dataKey="deaths" stroke="#820000" />
    <Line type="monotone" dataKey="recovered" stroke="#008200" />

  </LineChart>
};

export default renderLineChart