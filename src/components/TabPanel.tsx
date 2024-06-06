import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WavesIcon from '@mui/icons-material/Waves';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid } from '@mui/material';
import CustomTabPanel from './CustomTabPanel'
import { Tail } from './Tail';
import WeatherChart from './LineChart';

interface TabPanelProps {
    selectedTab: number;
    index: number;
    weatherHistory: any;
    removeTab: () => void;
}
function TabPanel(props: TabPanelProps) {
    const { selectedTab, index, weatherHistory, removeTab } = props;

    return (
        <CustomTabPanel value={selectedTab} index={index + 1}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={removeTab}>
                    Delete
                </Button>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                    <Tail name="Wind speed" value={`${weatherHistory?.current?.wind_kph} KM/H`} icon={<AirIcon sx={{ color: '#4B0082', height: 40, width: 40 }} />} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Tail name="Temperature" value={`${weatherHistory?.current?.temp_c} \u00b0C`} icon={<WbSunnyIcon sx={{ color: '#4B0082', height: 40, width: 40 }} />} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Tail name="UV index" value={`${weatherHistory?.current?.uv}`} icon={<WavesIcon sx={{ color: '#4B0082', height: 40, width: 40 }} />} />
                </Grid>
                <Grid item xs={12}>
                    <WeatherChart weatherHistory={weatherHistory} />
                </Grid>
            </Grid>
        </CustomTabPanel>
    )
}

export default TabPanel