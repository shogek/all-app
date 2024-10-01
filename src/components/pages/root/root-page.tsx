import HomeIcon from '@mui/icons-material/Home'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link, Outlet } from 'react-router-dom'

export default function RootPage() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton size="large" color="inherit" component={Link} to="/all-app/">
            <HomeIcon />
          </IconButton>

          <Typography variant="body1">Deployed @ 2024-10-01 21:46</Typography>
        </Toolbar>
      </AppBar>

      <Outlet />
    </div>
  )
}
