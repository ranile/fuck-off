import React, {useRef, useState} from "react";
import {GivenFuck} from "../models/GivenFuck";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {FuckToGive} from "../models/FuckToGive";
import TopCardBar from "../components/TopCardBar";
import ShowGivenFuck from "../components/ShowGivenFuck";

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
            if (givenFuck === undefined) {
                throw Error("impossible")
            }
            view = (
                <ShowGivenFuck givenFuck={givenFuck} onBackPressed={props.onBackPressed}/>
            )
            break
    }

    return view
}

export default GiveFuck
