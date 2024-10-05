import { styled } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

export const Wrapper = styled(Box)({ padding: '16px' })

export const Content = styled(Box)({ padding: '16px', border: '1px solid rgb(165, 165, 165)', borderRadius: '0.5rem' })

export const Listing = styled(List)({
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

export const ListingItem = styled(ListItem)({
  padding: 0,
  alignItems: 'flex-start',
})

export const ButtonIcon = styled(IconButton)({
  padding: '16px 0 0 10px',
  display: 'flex',
  gap: '8px',
})

export const ActionsWrapper = styled(Box)({
  marginTop: '16px',
  display: 'flex',
  justifyContent: 'flex-end',
})

export const AccordionWrapper = styled(Accordion)({
  marginTop: '16px',
})
