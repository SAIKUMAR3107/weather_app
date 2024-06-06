import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, Tabs, Toolbar } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { add, updateHistory } from '../store/feature/weather';
import { getWeatherData, getWeatherForecast } from '../api/weatherApi';
import Carousel from './Carousel';
import Alert from './Alert';
import CustomTabPanel from './CustomTabPanel';
import TabPanel from './TabPanel';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Dashboard() {
    const [city, setCity] = useState('');
    const [selectedCity, setSelectedCity] = useState<string[]>([])
    const [selectedTab, setSelectedTab] = useState(0);
    const [error, setError] = useState(false)
    const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
    const weather = useAppSelector((state) => state.weather.data)
    const weatherHistory = useAppSelector((state) => state.weather.history);
    const dispatch = useAppDispatch()

    const handleChange = async (event: SelectChangeEvent) => {
        const city = event.target.value as string;
        if (!selectedCity.includes(city)) {
            setCity(city);
            setSelectedCity(prev => [...prev, city]);
            setSelectedTab(selectedCity.length + 1)
            const data = await getWeatherData(city);
            const history = await getWeatherForecast(city)
            console.log(history)
            dispatch(add({
                location: city,
                data: data,
            }))
            dispatch(updateHistory({
                location: city,
                data: history
            }))

        } else {
            setError(true)
        }
    };

    const handleSelectedTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const removeTab = (name: string) => {
        const remaining = selectedCity.filter((city) => city !== name);
        setSelectedCity(remaining);
        setSelectedTab(remaining.length + 1)
        setCity('');
    }

    return (<Box>
        <Alert severity="error" open={error} message="already exist" onClose={() => setError(!error)} />
        <Toolbar sx={{ backgroundColor: '#4B0082', borderRadius: '50px' }}>
            <Box sx={{ width: { xs: '100%', lg: '30%' } }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={city}
                        label="Age"
                        onChange={handleChange}
                        sx={{
                            borderColor: 'white',
                            '&:before': {
                                borderColor: 'white',
                            },
                            '&:after': {
                                borderColor: 'white',
                            },
                        }}
                    >
                        <MenuItem value={'Delhi'}>Delhi</MenuItem>
                        <MenuItem value={'Hyderabad'}>Hyderabad</MenuItem>
                        <MenuItem value={'Rajahmundry'}>Rajahmundry</MenuItem>
                        <MenuItem value={'Bengaluru'}>Bengaluru</MenuItem>
                        <MenuItem value={'Khammam'}>Khammam</MenuItem>
                        <MenuItem value={'Vijayawada'}>Vijayawada</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        sx={{
                            m: 2
                        }}
                        label="Start date"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                    <DateTimePicker
                        sx={{ m: 2 }}
                        label="End date"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </LocalizationProvider>
            </Box>
        </Toolbar >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleSelectedTabChange} aria-label="basic tabs example">
                <Tab label="Overall" {...a11yProps(0)} />
                {selectedCity.map((city, index) => (
                    <Tab label={city} {...a11yProps(index + 1)} />
                ))}
            </Tabs>
        </Box>
        <CustomTabPanel value={selectedTab} index={0}>
            <Carousel />
        </CustomTabPanel>
        {selectedCity.map((city, index) => (
            <TabPanel selectedTab={selectedTab} index={index} weatherHistory={weatherHistory[city]} removeTab={() => removeTab(city)} />
        ))}
    </Box >);
}