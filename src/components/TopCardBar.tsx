import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, {ReactNode} from "react";

interface TopCardBarProps {
    showBackButton: boolean
    onBackPressed: () => void,
    children: ReactNode
}

function TopCardBar(props: TopCardBarProps) {
    return (
        <Toolbar>
            {props.showBackButton &&
            <IconButton edge="start" color="inherit" aria-label="back" onClick={() => props.onBackPressed()}>
                <ArrowBackIcon/>
            </IconButton>}
            <Typography variant="h6" component="h1">
                Fuck Off
            </Typography>
            <section className="top-bar-left">
                {props.children}
            </section>
        </Toolbar>
    )
}

TopCardBar.defaultProps = {
    showBackButton: true,
    onBackPressed: () => {},
    children: <></>
}

export default TopCardBar
