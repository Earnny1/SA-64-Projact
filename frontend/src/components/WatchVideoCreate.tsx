import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { UsersInterface } from "../models/IUser";
import { PlaylistsInterface } from "../models/IPlaylist";
import { ResolutionsInterface } from "../models/IResolution";
import { VideosInterface } from "../models/IVideo";
import { WatchVideoInterface } from "../models/IWatchVideo";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function WatchVideoCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [videos, setVideos] = useState<VideosInterface[]>([]);
  const [resolutions, setResolutions] = useState<ResolutionsInterface[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistsInterface[]>([]);
  const [watchVideo, setWatchVideo] = useState<Partial<WatchVideoInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof watchVideo;
    setWatchVideo({
      ...watchVideo,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getUsers = async () => {
    fetch(`${apiUrl}/users`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getVideos = async () => {
    fetch(`${apiUrl}/videos`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setVideos(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getResolution = async () => {
    fetch(`${apiUrl}/resolutions`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setResolutions(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPlaylist = async () => {
    fetch(`${apiUrl}/playlists`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPlaylists(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getUsers();
    getVideos();
    getResolution();
    getPlaylist();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      ResolutionID: convertType(watchVideo.ResolutionID),
      PlaylistID: convertType(watchVideo.PlaylistID),
      VideoID: convertType(watchVideo.VideoID),
      WatchedTime: selectedDate,
    };

    const requestOptionsPost = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/watch_videos`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          ??????????????????????????????????????????????????????
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          ???????????????????????????????????????????????????????????????
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ???????????????????????????????????????????????????????????????
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>??????????????????</p>
              <Select
                native
                value={watchVideo.VideoID}
                onChange={handleChange}
                inputProps={{
                  name: "VideoID",
                }}
              >
                <option aria-label="None" value="">
                  ????????????????????????????????????????????????
                </option>
                {videos.map((item: VideosInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>??????????????????????????????</p>
              <Select
                native
                value={watchVideo.ResolutionID}
                onChange={handleChange}
                inputProps={{
                  name: "ResolutionID",
                }}
              >
                <option aria-label="None" value="">
                  ????????????????????????????????????????????????????????????
                </option>
                {resolutions.map((item: ResolutionsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Value}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>??????????????????????????????</p>
              <Select
                native
                value={watchVideo.PlaylistID}
                onChange={handleChange}
                inputProps={{
                  name: "PlaylistID",
                }}
              >
                <option aria-label="None" value="">
                  ????????????????????????????????????????????????????????????
                </option>
                {playlists.map((item: PlaylistsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Title}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>???????????????????????????????????????</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="WatchedTime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="?????????????????????????????????????????????????????????????????????"
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/watch_videos"
              variant="contained"
            >
              ????????????
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              ??????????????????
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default WatchVideoCreate;
