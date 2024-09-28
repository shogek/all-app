import { memo, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import type { ChecklistNote } from '../../../db/schema/checklist-notes'
import useUpdateChecklistNote from '../../shared/hooks/use-update-checklist-note.hook'
import * as S from './todo-list.styles'

type Checklist = {
  id: number
  order: number
  isChecked: boolean
  text: string
}

type TodoListProps = ChecklistNote

// TODO: Create a mini version of this to be visible on the homepage
// TODO: If no items in note, create new one and focus on it
function TodoList(props: TodoListProps) {
  const navigate = useNavigate()
  const { isPending, mutateAsync: updateChecklistNote } = useUpdateChecklistNote()
  const [items, setItems] = useState<Checklist[]>(JSON.parse(props.json ?? ''))

  const handleSaveChanges = async () => {
    await updateChecklistNote({ ...props, json: JSON.stringify(items) })
    navigate(-1)
  }

  const handleChangeChecked = (changedItem: Checklist) => {
    const updatedItems = items.map((item) => {
      if (item.id !== changedItem.id) {
        return item
      }

      return { ...item, isChecked: !changedItem.isChecked }
    })

    setItems(updatedItems)
  }

  const handleChangeText = (changedItem: Checklist, changedText: string) => {
    const updatedItems = items.map((item) => {
      if (item.id !== changedItem.id) {
        return item
      }

      return { ...item, text: changedText }
    })

    setItems(updatedItems)
  }

  const handleAddNewItem = () => {
    const ids = items.length ? items.map((x) => x.id) : [0]
    const newId = Math.max(...ids) + 1

    const orders = items.length ? items.map((x) => x.order) : [0]
    const newOrder = Math.max(...orders) + 1

    const newItem: Checklist = {
      id: newId,
      order: newOrder,
      isChecked: false,
      text: '',
    }

    setItems([...items, newItem])
  }

  return (
    <S.Wrapper>
      <S.Content>
        <Typography variant="h5" sx={{ marginLeft: '10px' }}>
          {props.title}
        </Typography>

        <S.Listing>
          {items.map((item) => (
            <S.ListingItem key={item.id}>
              <Checkbox checked={item.isChecked} onChange={() => handleChangeChecked(item)} />

              <TextField
                multiline
                id="standard-basic"
                variant="standard"
                value={item.text}
                onChange={(e) => handleChangeText(item, e.target.value)}
              />
            </S.ListingItem>
          ))}
        </S.Listing>

        <S.ButtonIcon size="large" color="inherit" sx={{}} onClick={handleAddNewItem}>
          <AddIcon />
          <Typography variant="body1">Add item</Typography>
        </S.ButtonIcon>
      </S.Content>

      <S.ActionsWrapper>
        <Button disabled={isPending} variant="contained" onClick={handleSaveChanges}>
          Save
        </Button>
      </S.ActionsWrapper>
    </S.Wrapper>
  )
}

export default memo(TodoList)
