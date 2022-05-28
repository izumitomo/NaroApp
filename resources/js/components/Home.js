import axios from "axios";
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
import FindInPageIcon from '@material-ui/icons/FindInPage';
import FormHelperText from '@material-ui/core/FormHelperText';

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
}));

export default function Home(){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [genre, setGenre] = React.useState('');
  const genreSelect = (event) => {
    setGenre(event.target.value);
  };
  
  
  const [checked, setChecked] = React.useState(false);
  const [notIsekai, setNotIsekai] = React.useState(1);
  const checkBoxChange = (event) => {
    if (checked == false){//checkedはチェックを入れる前の変化前の状態
      setNotIsekai(0);
      console.log("false0")
    }else{
      setNotIsekai(1);
      console.log("true0")
    }
    setChecked(event.target.checked);//必ず最後に実行される。
  };
  
const [isOpen, setIsOpen] = React.useState(false);
const handleIsOpen = () => {
  setIsOpen(true)
}

  
  
  let base_url = "https://api.syosetu.com/novelapi/api/?lim=5&order=weekly" + "&genre=" + genre + "&nottensei=" + notIsekai + "&nottenni=" + notIsekai;
  /*const search = () => {
    api_url = "https://api.syosetu.com/novelapi/api/?lim=5&genre=" + 9902&nottensei=1&nottenni=1&order=weekly"
  };*/
  
  
  
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
            onClick={handleIsOpen}
            //component={ Link } to={"/search"}
          >
            <b>計測</b>
          </Button>
        </div>
    </div>
    <Link to="/search">search</Link>
    <p>{ genre }, { checked }</p>
    <p>{base_url}</p>
    {isOpen ? (
      <Search
        base_url={base_url}//左が渡す名前で右が渡す変数
      /> 
    ) : null
    }
    
    <Checkboxes/>
  </div>
  );
}


export function Checkboxes() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Checkbox
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
      <Checkbox disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />
      <Checkbox disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
      <Checkbox
        defaultChecked
        indeterminate
        inputProps={{ 'aria-label': 'indeterminate checkbox' }}
      />
      <Checkbox
        defaultChecked
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      />
      <Checkbox
        defaultChecked
        size="small"
        inputProps={{ 'aria-label': 'checkbox with small size' }}
      />
    </div>
  );
}