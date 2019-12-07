import React, { useContext } from 'react'
import { UsersDashboardContext } from 'pages/user-dashboard'
import { makeStyles, Grid, Card, CardContent, Typography, Button, CardActions } from '@material-ui/core'
import cookie from 'js-cookie'
import FileSaver from 'file-saver'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

const CreateSurat: React.FC = () => {
  const { dispatch } = useContext(UsersDashboardContext)

  const classes = useStyles({})

  const handleCreateKK = async () => {
    const token = cookie.get('token')
    try {
      const url = 'http://localhost:8000/api/create-kk'
      const response = await fetch(
        url,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'token ' + token
          },
          body: JSON.stringify({ jenis_surat: 'KK' })
        }
      )
      if (response.ok) {
        const resData = await response.text()
        const blob = new Blob([resData], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, `${moment().format('DD-MM-YYYY').toString()}-kk.pdf`);
        dispatch({ type: 'setNotif', notif: {
          open: true,
          message: 'success create surat',
          variant: 'success'
        }})
      } else {
        dispatch({ type: 'setNotif', notif: {
          open: true,
          message: 'failed create surat',
          variant: 'error'
        }})
      }
    } catch (error) {
      dispatch({ type: 'setNotif', notif: {
        open: true,
        message: error.message,
        variant: 'error'
      }})
    }
  }

  const handleCreateCK = async () => {
    const token = cookie.get('token')
    try {
      const url = 'http://localhost:8000/api/create-ck'
      const response = await fetch(
        url,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'token ' + token
          },
          body: JSON.stringify({ jenis_surat: 'CK' })
        }
      )
      if (response.ok) {
        const resData = await response.text()
        const blob = new Blob([resData], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, `${moment().format('DD-MM-YYYY').toString()}-ck.pdf`);
        dispatch({ type: 'setNotif', notif: {
          open: true,
          message: 'success create surat',
          variant: 'success'
        }})
      } else {
        dispatch({ type: 'setNotif', notif: {
          open: true,
          message: 'failed create surat',
          variant: 'error'
        }})
      }
    } catch (error) {
      dispatch({ type: 'setNotif', notif: {
        open: true,
        message: error.message,
        variant: 'error'
      }})
    }
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Surat Keterangan Kuliah
              </Typography>
              <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={handleCreateKK} size="small">Buat Surat</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Surat Keterangan Kuliah
              </Typography>
              <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={handleCreateCK}size="small">Buat Surat</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default CreateSurat
