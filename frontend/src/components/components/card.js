import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard({props}) {
    return (
        <Card sx={{ minWidth:'150px',maxWidth:'auto'}}>
            <CardActionArea>
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    height="140"*/}
                {/*    image="/static/images/cards/contemplative-reptile.jpg"*/}
                {/*    alt="green iguana"*/}
                {/*/>*/}
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {props && props.text}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary'}}>
                        {props && props.value}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
