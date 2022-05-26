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

export default function Home() {
  const classes = useStyles();
  const [genre, setGenre] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const genreSelect = (event) => {
    setGenre(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  const [checked, setChecked] = React.useState(false);
  const checkBoxChange = (event) => {
    setChecked(event.target.checked);
  };
  
  
  
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
              //onChange={handleChange}
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
                control={<Checkbox color="secondary"/>} //onChange={handleChange}/>}
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
          >
            <b>計測</b>
          </Button>
        </div>
    </div>
    <Link to="/search">search</Link>
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