import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
}));

function Example() {
  const classes = useStyles();
  const [genre, setgenre] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setgenre(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  
  
    const title = "なろーせんとーりょく";
    return (
        <div>
          <h1 style={styles.title}>{ title }</h1>
          <div style={styles.block}>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">ジャンル</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={genre}
                        onChange={handleChange}
                    >
                     <MenuItem value="">
                        </MenuItem>
                        <MenuItem value={101}>異世界(恋愛)</MenuItem>
                        <MenuItem value={102}>現実世界（恋愛）</MenuItem>
                        <MenuItem value={201}>ハイファンタジー</MenuItem>
                        <MenuItem value={202}>ローファンタジー</MenuItem>
                        <MenuItem value={301}>純文学</MenuItem>
                        <MenuItem value={302}>ヒューマンドラマ</MenuItem>
                        <MenuItem value={303}>歴史</MenuItem>
                        <MenuItem value={304}>推理</MenuItem>
                        <MenuItem value={305}>ホラー</MenuItem>
                        <MenuItem value={306}>アクション</MenuItem>
                        <MenuItem value={307}>コメディ－</MenuItem>
                        <MenuItem value={401}>VRゲーム</MenuItem>
                        <MenuItem value={402}>宇宙</MenuItem>
                        <MenuItem value={403}>空想科学</MenuItem>
                        <MenuItem value={404}>パニック</MenuItem>
                        <MenuItem value={9901}>童話</MenuItem>
                        <MenuItem value={9902}>詩</MenuItem>
                        <MenuItem value={9903}>エッセイ</MenuItem>
                        <MenuItem value={9904}>リプレイ</MenuItem>
                        <MenuItem value={9999}>その他</MenuItem>
                        <MenuItem value={9801}>ノンジャンル</MenuItem>
                    </Select>
                  </FormControl>
            </div>
            <div>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="secondary" />}
                      label="異世界転生・召喚を含む"
                      labelPlacement="start"
                    />
                  </FormGroup>
                </FormControl>
            </div>
            <div>
                <Button
                    style={{
                        backgroundColor: "#4feff7",
                    }}
                    variant="contained"
                    className={classes.button}
                    startIcon={<SearchIcon />}
                >
                    <b>検索</b>
                </Button>
            </div>
          </div>
        </div>
   );
}

var styles={
    title:{
        textAlign: "center",
        color: "black" ,
        fontSize: 40,
    },
    block:{
        display: "flex",
        backgroundColor: "white",
        verticalAlign: "middle",
        justifyContent: "space-around",
    },
}


export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
