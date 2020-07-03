import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {Link} from "react-router-dom";

export default function CardComponent(props){
    function route(){
        if (props.title === "Track Document"){
            return "/trackDocument";
        }

        if (props.title === "Add Document"){
            return "/newDocumentCreation";
        }

        if (props.title === "Receive Document"){
            return "/receiveDocument";
        }

        if (props.title === "Release Document"){
            return "/releasedDocument";
        }
    }
    return(
        <Link to={route()} style={{textDecoration: "none"}}>
            <Card>
                <CardHeader avatar={ <Avatar aria-label="recipe">
                    {props.cardHeaderText}
                </Avatar>} title={props.title} />
                <CardMedia
                    style={{height: 0,paddingTop: '50%'}}
                    image={props.image}
                    title={props.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.cardContent}
                    </Typography>
                </CardContent>
            </Card>
        </Link>

    );
}