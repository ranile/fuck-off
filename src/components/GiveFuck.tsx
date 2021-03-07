import React, {useRef, useState} from "react";
import {GivenFuck} from "../models/GivenFuck";
import axios from "axios";
import {Button, Snackbar, TextField, Typography} from "@material-ui/core";
import {FuckToGive} from "../models/FuckToGive";
import TopCardBar from "../components/TopCardBar";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';

interface GiveFuckProps {
    fuck: FuckToGive,
    onBackPressed: () => void,
}

enum State {
    Input,
    Output,
}

function GiveFuck(props: GiveFuckProps) {
    const fuck = props.fuck

    const data = useRef(new Map())
    const [state, setState] = useState(State.Input)
    const [givenFuck, setGivenFuck] = useState<GivenFuck>()
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    let view
    switch (state) {
        case State.Input:
            const onClick = async () => {
                let url = fuck.url
                fuck.fields.forEach(field => {
                    url = url.replace(`:${field.field}`, data.current.get(field.field))
                })
                const resp = await axios.get(`https://foaas.com${url}`, {
                    headers: {'Accept': 'application/json'},
                })

                const json = resp.data as GivenFuck

                console.log(json, url)
                setGivenFuck(json)
                setState(State.Output)
            }

            const fields = fuck.fields.map(field => {
                return (
                    <TextField
                        onChange={(e) => data.current.set(field.field, e.target.value)}
                        placeholder={field.name}
                        key={field.field}
                    />
                )
            })

            view = (
                <>
                    <TopCardBar onBackPressed={props.onBackPressed}/>
                    <div className="fuck-content">
                        <Typography variant="h5" component="h2">
                            {fuck.name}
                        </Typography>

                        {fields}
                        <Button onClick={onClick}>Fuck</Button>
                    </div>
                </>
            )
            break
        case State.Output:
            const onCopy = () => {
                setSnackbarOpen(true)
            }
            view = (
                <>
                    <TopCardBar onBackPressed={props.onBackPressed}>
                        <CopyToClipboard text={`${givenFuck?.message} ${givenFuck?.subtitle}`} onCopy={onCopy} >
                            <FileCopyIcon className="clickable"/>
                        </CopyToClipboard>
                    </TopCardBar>
                    <div className="fuck-content">
                        <Typography variant="h4" component="p">
                            {givenFuck?.message}
                        </Typography>

                        <Typography variant="body1" component="p">
                            {givenFuck?.subtitle}
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
            break
    }

    return view
}

export default GiveFuck
