import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export interface BudgetProps {
    name: string
    sx?: SxProps;
    value: string;
    icon?: React.JSX.Element
}

export function Tail({ sx, name, value, icon }: BudgetProps): React.JSX.Element {

    return (
        <Card sx={{
            borderRadius: '20px',
            boxShadow:
                '0 5px 22px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.06)',
            ...sx,
        }}>
            <CardContent>
                <Stack spacing={3}>
                    <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
                        <Stack spacing={1}>
                            <Typography color="text.secondary" variant="overline">
                                {name}
                            </Typography>
                            <Typography variant="h4">{value}</Typography>
                        </Stack>
                        {icon &&
                            <Avatar sx={{ backgroundColor: '#fff', height: '100px', width: '100px' }}>
                                {icon}
                            </Avatar>}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
