import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function Example() {
    const title = "なろーせんとーりょく";
    return (
        <div>
            <h1 style={styles.title}>{ title }</h1>
            <Grid container alignItems="center" justify="center" spacing={0}>
                <div style={styles.grid}>
                    <Grid item xs={12}>
                        <p>This is Grid item xs = 4</p>
                    </Grid>
                    <Grid item xs={12}>
                        <p>This is Grid item xs = 4</p>
                    </Grid>
                    <Grid item xs={12}>
                        <p>This is Grid item xs = 4</p>
                    </Grid>
                </div>
                <Checkbox
                    defaultChecked
                    color="secondary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </Grid>
        </div>
   );
}

var styles={
    title:{
        textAlign: "center",
        color: "black" ,
        fontSize: 40,
    },
    grid:{
        textAlign: "center",
    }
}


export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
