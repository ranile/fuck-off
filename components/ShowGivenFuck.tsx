import TopCardBar from "./TopCardBar";
import {CopyToClipboard} from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import React, {useState} from "react";
import {GivenFuck} from "../models/GivenFuck";

interface ShowGivenFuckProps {
    givenFuck: GivenFuck,
    onBackPressed: () => void,
}

function ShowGivenFuck(props: ShowGivenFuckProps) {
    const {givenFuck} = props

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const onCopy = () => {
        setSnackbarOpen(true)
    }

    return (
        <>
            <TopCardBar onBackPressed={props.onBackPressed}>
                <CopyToClipboard text={`${givenFuck.message} ${givenFuck.subtitle}`} onCopy={onCopy}>
                    <FileCopyIcon className="clickable"/>
                </CopyToClipboard>
            </TopCardBar>
            <div className="fuck-content">
                <Typography variant="h4" component="p">
                    {givenFuck.message}
                </Typography>

                <Typography variant="body1" component="p">
                    {givenFuck.subtitle}
                </Typography>
            </div>
            <Snackbar
                open={snackbarOpen}
                message="Copied"
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            />
        </>
    )
}

export default ShowGivenFuck
