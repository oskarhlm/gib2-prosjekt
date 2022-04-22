import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const data = [
  //Lenght er avstand fra startpunkt, 
  {length: 2,hoyde: 2400},{lenght: 2,hoyde: 1398},{lenght: 2,hoyde: 9800},{lenght: 2,hoyde: 3908},{lenght: 2,hoyde: 4800},{lenght: 2,hoyde: 2390},{lenght: 2,hoyde: 4300},
];

export default class HeightLineChart extends PureComponent {
  render() {
    return (
      <div style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        display: 'flex',
        zIndex: 420,
        opacity: 0.8,
        backgroundColor: 'none'
        }}>
      <ResponsiveContainer minWidth="500px" minHeight="300px">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={'lenght'} strokeWidth={4} fontSize={15} fontWeight={"bold"}/>
          <YAxis strokeWidth={4} fontSize={15} fontWeight={"bold"}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="hoyde" stroke="#FF0000" strokeWidth={4} />
        </LineChart>
      </ResponsiveContainer>
      </div>
    );
  }
}