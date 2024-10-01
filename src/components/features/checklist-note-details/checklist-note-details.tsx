import { memo, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import type { ChecklistItem, ChecklistNote } from '../../../db/schema/checklist-notes'
import useUpdateChecklistNote from '../../shared/hooks/use-update-checklist-note.hook'
import * as S from './checklist-note-details.styles'

type TodoListProps = ChecklistNote

// TODO: If no items in note, create new one and focus on it
function ChecklistNoteDetails(props: TodoListProps) {
  const navigate = useNavigate()
  const { isPending, mutateAsync: updateChecklistNote } = useUpdateChecklistNote()
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(JSON.parse(props.json ?? ''))
  const [focusedChecklistItemId, setFocusedChecklistItemId] = useState(-1)

  const handleDeleteEntryClicked = (toDeleteId: number) => {
    const filtered = checklistItems.filter((x) => x.id !== toDeleteId)
    setChecklistItems(filtered)
  }

  const handleEntryFocused = (focused: ChecklistItem) => {
    setFocusedChecklistItemId(focused.id)
  }

  const handleSaveChangesClicked = async () => {
    await updateChecklistNote({ ...props, json: JSON.stringify(checklistItems) })
    navigate(-1)
  }

  const handleCheckChanged = (changedItem: ChecklistItem) => {
    const updatedItems = checklistItems.map((item) => {
      if (item.id !== changedItem.id) {
        return item
      }

      return { ...item, isChecked: !changedItem.isChecked }
    })

    setChecklistItems(updatedItems)
  }

  const handleTextChanged = (changedItem: ChecklistItem, changedText: string) => {
    const updatedItems = checklistItems.map((item) => {
      if (item.id !== changedItem.id) {
        return item
      }

      return { ...item, text: changedText }
    })

    setChecklistItems(updatedItems)
  }

  const handleAddNewItem = () => {
    const ids = checklistItems.length ? checklistItems.map((x) => x.id) : [0]
    const newId = Math.max(...ids) + 1

    const orders = checklistItems.length ? checklistItems.map((x) => x.order) : [0]
    const newOrder = Math.max(...orders) + 1

    const newItem: ChecklistItem = {
      id: newId,
      order: newOrder,
      isChecked: false,
      text: '',
    }

    setChecklistItems([...checklistItems, newItem])
  }

  return (
    <S.Wrapper>
      <S.Content>
        <Typography variant="h5" sx={{ marginLeft: '10px' }}>
          {props.title}
        </Typography>

        <S.Listing>
          {checklistItems.map((checklistItem) => (
            <S.ListingItem key={checklistItem.id}>
              <Checkbox checked={checklistItem.isChecked} onChange={() => handleCheckChanged(checklistItem)} />

              <TextField
                multiline
                fullWidth
                id="standard-basic"
                variant="standard"
                value={checklistItem.text}
                onFocus={() => handleEntryFocused(checklistItem)}
                onChange={(e) => handleTextChanged(checklistItem, e.target.value)}
              />

              <IconButton
                disabled={checklistItem.id !== focusedChecklistItemId}
                sx={{ visibility: checklistItem.id === focusedChecklistItemId ? 'initial' : 'hidden' }}
                onClick={() => handleDeleteEntryClicked(checklistItem.id)}
              >
                <ClearIcon />
              </IconButton>
            </S.ListingItem>
          ))}
        </S.Listing>

        <S.ButtonIcon size="large" color="inherit" sx={{}} onClick={handleAddNewItem}>
          <AddIcon />
          <Typography variant="body1">Add item</Typography>
        </S.ButtonIcon>
      </S.Content>

      <S.ActionsWrapper>
        <Button disabled={isPending} variant="contained" onClick={handleSaveChangesClicked}>
          Save
        </Button>
      </S.ActionsWrapper>
    </S.Wrapper>
  )
}

export default memo(ChecklistNoteDetails)
