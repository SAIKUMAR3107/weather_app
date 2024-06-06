import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Typography, Paper, Box } from '@mui/material';

interface WeatherChartProps {
    weatherHistory: any;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ weatherHistory }: WeatherChartProps) => {
    if (!weatherHistory) return <div>Loading...</div>;

    const data = weatherHistory.forecast.forecastday[0].hour.map((hour: { time: string; temp_c: any; temp_f: any; }) => ({
        time: hour.time.split(' ')[1],
        temp_c: hour.temp_c,
        temp_f: hour.temp_f,
    }));

    return (
        <Paper>
            <Box m={2}>
                <Typography variant="h6">Temperature Variation</Typography>
                <LineChart width={600} height={300} data={data}>
                    <Line type="monotone" dataKey="temp_c" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </Box>
        </Paper>
    );
};

export default WeatherChart;
