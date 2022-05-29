import axios from "axios";
import React, {useState, useEffect} from 'react';
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
import FindInPageIcon from '@material-ui/icons/FindInPage';


import { Link } from "react-router-dom";
import Search from "./Search";

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(0),
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 240,
  },
  formPadding: {
    paddingTop: 15,
  },
  startIcon: {
    marginLeft: 0,
    marginRight: 0,
  },
  title: {
    textAlign: "center",
    color: "black" ,
    fontSize: 40,
  },
  block: {
    display: "flex",
    backgroundColor: "white",
    verticalAlign: "middle",
    justifyContent: "space-around",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Home(){
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [genre, setGenre] = useState('');
  const genreSelect = (event) => {
    setGenre(event.target.value);
  };
  
  
  const [checked, setChecked] = useState(false);
  const [notIsekai, setNotIsekai] = useState(1);
  const checkBoxChange = (event) => {
    if (checked == false){//checkedはチェックを入れる前の変化前の状態
      setNotIsekai(0);
    }else{
      setNotIsekai(1);
    }
    setChecked(event.target.checked);//必ず最後に実行される。
  };
  
  let response
  const [search, setSearch] = useState(false);
  const handleSearch = () => {
    setSearch(true);
    const data = {
      genre : genre,
      notIsekai : notIsekai,
    }
    axios.post("/search", data)
    .then(res => {
      response = res.data;
      console.log(response)
    }
    );
    //axios.get(base_url, {
      //headers: {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"}}).then(res => console.log(res.data))  
  };
  
  let base_url = "https://api.syosetu.com/novelapi/api/?lim=5&out=json&order=weekly" + "&genre=" + genre + "&nottensei=" + notIsekai + "&nottenni=" + notIsekai;

  const title = "なろーせんとーりょく！";
  return (
    <div>
      <h1 className={classes.title}>{ title }</h1>
      <div className={classes.block}>
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
              onChange={genreSelect}
            >
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
          <FormControl component="fieldset" className={classes.formPadding}>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="end"
                control={<Checkbox 
                  color="secondary" 
                  checked={checked}
                  onChange={checkBoxChange}/>}
                label="異世界転生・召喚を含む"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </div>
        <div className="FindInPageIcon">
          <Button
            style={{
              backgroundColor: "#4feff7",
            }}
            variant="contained"
            size="large"
            className={classes.button}
            startIcon={<FindInPageIcon/>}
            onClick={handleSearch}
            //component={ Link } to={"/search"}
          >
            <b>計測</b>
          </Button>
        </div>
    </div>
    <p>{base_url}</p>
    {search ? (
      <Search
        base_url = {base_url}//左が渡す名前で右が渡す変数
        search = {search}
        response = {response}
      />
      
    ) : null
    }
    
    <FullWidthGrid/>
    
  </div>
  );
}



import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


export function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} columns={16}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}