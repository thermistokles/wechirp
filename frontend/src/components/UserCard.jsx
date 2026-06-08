import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
const UserCard = ({user}) => {
    console.log("user: ", user)
    return (
        <Card>
            <CardMedia
                sx={{ height: 140 }}
                // image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {user.username}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Joined on {user.created_at}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Follow</Button>
                {/* <Button size="small">Learn More</Button> */}
            </CardActions>
        </Card>
    )
}

export default UserCard