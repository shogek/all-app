import { memo, useEffect, useMemo, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import type { ChecklistItem, ChecklistNote } from '../../../db/schema/checklist-notes'
import useUpdateChecklistNote from '../../shared/hooks/use-update-checklist-note.hook'
import * as S from './checklist-note-details.styles'

type ChecklistNoteDetailsProps = ChecklistNote

function ChecklistNoteDetails(props: ChecklistNoteDetailsProps) {
  const navigate = useNavigate()
  const { isPending, mutateAsync: updateChecklistNote } = useUpdateChecklistNote()
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(JSON.parse(props.json ?? ''))
  const [focusedChecklistItemId, setFocusedChecklistItemId] = useState(-1)
  /** Used for focusing on a newly created entry */
  const [newlyAddedEntryId, setNewlyAddedEntryId] = useState(-1)

  const tickedItems = useMemo(() => checklistItems.filter((x) => x.isChecked), [checklistItems])
  const untickedItems = useMemo(() => checklistItems.filter((x) => !x.isChecked), [checklistItems])

  useEffect(() => {
    if (newlyAddedEntryId !== -1) {
      // We are assuming that React has focused on the input field
      setNewlyAddedEntryId(-1)
    }
  }, [newlyAddedEntryId])

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

    setNewlyAddedEntryId(newId)
    setChecklistItems([...checklistItems, newItem])
  }

  return (
    <S.Wrapper>
      <S.Content>
        <Typography variant="h5" sx={{ marginLeft: '10px' }}>
          {props.title}
        </Typography>

        <S.Listing>
          {untickedItems.map((untickedItem) => (
            <S.ListingItem key={untickedItem.id}>
              <Checkbox checked={untickedItem.isChecked} onChange={() => handleCheckChanged(untickedItem)} />

              <TextField
                inputRef={(input) => input && untickedItem.id === newlyAddedEntryId && input.focus()}
                multiline
                fullWidth
                variant="standard"
                value={untickedItem.text}
                onFocus={() => handleEntryFocused(untickedItem)}
                onChange={(e) => handleTextChanged(untickedItem, e.target.value)}
              />

              <IconButton
                disabled={untickedItem.id !== focusedChecklistItemId}
                sx={{ visibility: untickedItem.id === focusedChecklistItemId ? 'initial' : 'hidden' }}
                onClick={() => handleDeleteEntryClicked(untickedItem.id)}
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

        {tickedItems.length > 0 && (
          <S.AccordionWrapper>
            <Accordion defaultExpanded={untickedItems.length < 1}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {tickedItems.length > 1 ? `${tickedItems.length} ticked items` : `${tickedItems.length} ticked item`}
              </AccordionSummary>

              <AccordionDetails>
                <S.Listing>
                  {tickedItems.map((tickedItem) => (
                    <S.ListingItem key={tickedItem.id}>
                      <Checkbox checked color="default" onChange={() => handleCheckChanged(tickedItem)} />

                      {/* TODO: Change text color to gray */}
                      <TextField
                        sx={{ textDecoration: 'line-through' }}
                        multiline
                        fullWidth
                        variant="standard"
                        value={tickedItem.text}
                        onFocus={() => handleEntryFocused(tickedItem)}
                        onChange={(e) => handleTextChanged(tickedItem, e.target.value)}
                      />

                      <IconButton
                        disabled={tickedItem.id !== focusedChecklistItemId}
                        sx={{ visibility: tickedItem.id === focusedChecklistItemId ? 'initial' : 'hidden' }}
                        onClick={() => handleDeleteEntryClicked(tickedItem.id)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </S.ListingItem>
                  ))}
                </S.Listing>
              </AccordionDetails>
            </Accordion>
          </S.AccordionWrapper>
        )}
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
