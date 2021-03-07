import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            backgroundColor: theme.palette.background.paper
        }
    }
});

function Footer() {
    let classes = useStyles()
    return (
        <section id="footer" className={classes.root}>
            <article className="left">
                <Typography variant="subtitle1" component="p">
                    Using
                    <Link href="https://foaas.com/" color="secondary"> Fuck Off As A Service </Link>
                    API.
                </Typography>
            </article>

            <article className="right">
                <Typography variant="subtitle1" component="p">
                    <Link href="https://github.com/hamza1311/fuck-off"><Button>GitHub</Button></Link>
                </Typography>
            </article>

        </section>
    )
}

export default Footer
