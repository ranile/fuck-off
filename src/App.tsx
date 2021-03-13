import React, {useState} from 'react';
import {operations} from "./data";
import {FuckToGive} from "./models/FuckToGive";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GiveFuck from "./components/GiveFuck";
import TopCardBar from "./components/TopCardBar";
import Footer from "./components/Footer";

function App() {
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
                    onChange={(event, value) => setCurrentFuck(value)}
                />
            </div>
        </>


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <Card raised={true} id="fuck-off-card">
                    <CardContent>
                        {fuck}
                    </CardContent>
                </Card>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
