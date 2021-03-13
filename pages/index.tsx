import React, {useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {FuckToGive} from "../models/FuckToGive";
import Footer from "../components/Footer";
import GiveFuck from "../components/GiveFuck";
import TopCardBar from "../components/TopCardBar";
import {operations} from "../utils/data"
import Head from 'next/head'

const IndexPage = () => {
    const [currentFuck, setCurrentFuck] = useState<FuckToGive | null>(null)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const fuck = currentFuck ?
        <div className="fuck-off-card-content">
            <GiveFuck fuck={currentFuck} onBackPressed={() => setCurrentFuck(null)}/>
        </div> :
        <>
            <TopCardBar showBackButton={false}/>
            <div className="fuck-off-card-content">
                <Autocomplete
                    className="autocomplete-input"
                    options={operations}
                    getOptionLabel={(option) => option.name}
                    autoComplete
                    includeInputInList
                    renderInput={(params) => <TextField {...params} label="Fuck to give" margin="normal"/>}
                    onChange={(_, value) => setCurrentFuck(value)}
                />
            </div>
        </>


    return (
        <>
            <Head>
                <title>Fuck off</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" key="viewport"/>
                <meta name="description" content="Tells people to fuck off" key="description"/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" key="font"/>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <Card raised={true} id="fuck-off-card">
                        <CardContent>
                            {fuck}
                        </CardContent>
                    </Card>
                    <Footer/>
                </div>
            </ThemeProvider>
        </>
    );
}

export default IndexPage
