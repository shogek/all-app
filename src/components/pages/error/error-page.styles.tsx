import { styled } from '@mui/material'
import Box from '@mui/material/Box'

export const Wrapper = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'grid',
  placeItems: 'center',
})

export const Content = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})
