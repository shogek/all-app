import { styled } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

export const Title = styled(Typography)({
  color: 'text.secondary',
  fontSize: 16,
  fontWeight: 'bold',
})

export const UntickedItem = styled(ListItem)({
  padding: '0',
  gap: '8px',
})

export const ItemText = styled(Typography)({
  color: 'text.secondary',
  fontSize: 14,
})

export const TickedItems = styled(Typography)({
  marginTop: '8px',
  color: 'text.secondary',
  fontSize: 14,
})
