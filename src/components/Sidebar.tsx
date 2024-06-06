import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

export default function Sidebar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);


    const navigations = [
        {
            name: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/'
        },
        {
            name: 'Contact',
            icon: <GroupIcon />,
            path: '/contact'
        },
        {
            name: 'Report',
            icon: <ArticleIcon />,
            path: '/report'
        },
        {
            name: 'Settings',
            icon: <SettingsIcon />,
            path: '/settings'
        }
    ]

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {navigations.map((nav, index) => (
                    <Link to={nav.path} style={{ textDecoration: 'none' }}>
                        <ListItem key={index} disablePadding sx={{ color: selectedIndex !== index ? '#fff' : '#DA70D6', ml: 4 }}>
                            <ListItemButton selected={selectedIndex == index} onClick={(event) => handleListItemClick(event, index)}>
                                <ListItemIcon sx={{ color: selectedIndex !== index ? '#fff' : '#DA70D6' }}>
                                    {nav.icon}
                                </ListItemIcon>
                                <ListItemText sx={{ '& .MuiTypography-root': { fontWeight: 'bolder' } }} primary={nav.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position='relative'
                elevation={0}
                sx={{
                    background: 'rgb(243, 222, 229)',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            flexGrow: 1, display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Platform
                    </Typography>
                    <Box sx={{ flexGrow: 0, mr: 2 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#4B0082' },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRadius: '0px 50px 0px 0px', background: '#4B0082' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
