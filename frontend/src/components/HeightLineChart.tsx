import React, { PureComponent, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import { RootState } from 'ducks/store';
import { useSelector } from 'react-redux';

type GraphData = {
  length: number;
  hoyde: number;
};

const HeightLineChart = () => {
  const pathSegments = useSelector((state: RootState) => state.path);
  const [data, setData] = useState<GraphData[]>([]);
  const [travelTime, setTravelTime] = useState<number>();

  useEffect(() => {
    let newData: GraphData[] = [];
    let currLength = 0;
    let currCost = 0;
    pathSegments.forEach((seg) => {
      currLength += seg.properties.seg_length / 1000;
      newData.push({
        hoyde: Math.round(seg.properties.from_z * 100) / 100,
        length: currLength,
      });
      currCost = seg.properties.agg_cost;
    });
    setData(newData);
    setTravelTime(currCost);
    // setTravelTime(pathSegments[pathSegments.length - 2].properties.agg_cost);
  }, [pathSegments]);

  return (
    <>
      {data.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            // display: 'flex',
            zIndex: 420,
            opacity: 0.8,
            backgroundColor: 'rgba(249, 249, 249, 0.712)',
            paddingTop: 20,
            borderRadius: 20,
          }}
        >
          <ResponsiveContainer minWidth="500px" minHeight="300px">
            <LineChart
              width={500}
              height={200}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 5,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey={'lenght'}
                strokeWidth={4}
                fontSize={15}
                fontWeight={'bold'}
                tickLine={false}
              >
                <Label
                  // value="Avstand fra start [m]"
                  fontWeight={'bold'}
                  fontSize={'15'}
                  position={'insideBottom'}
                  dy={8}
                ></Label>
              </XAxis>
              <YAxis
                strokeWidth={4}
                fontSize={15}
                fontWeight={'bold'}
                domain={[0, (dataMax: number) => Math.max(100, dataMax)]}
              >
                <Label
                  value="Høyde [moh]"
                  fontWeight={'bold'}
                  fontSize={'15'}
                  angle={-90}
                  dx={-15}
                ></Label>
              </YAxis>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="hoyde"
                stroke="#FF0000"
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          {travelTime && (
            <h2
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: 5,
              }}
            >
              Anslått reisetid: {Math.round(travelTime)} minutter
            </h2>
          )}
        </div>
      )}
    </>
  );
};

export default HeightLineChart;
