import { memo, useMemo } from 'react'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import { useNavigate } from 'react-router-dom'
import { ChecklistItem, ChecklistNote } from '../../../db/schema/checklist-notes'
import * as S from './checklist-note-overview.styles'

type ChecklistNoteOverviewProps = ChecklistNote

function ChecklistNoteOverview(props: ChecklistNoteOverviewProps) {
  const navigate = useNavigate()
  const checklistItems = useMemo((): ChecklistItem[] => JSON.parse(props.json ?? ''), [props.json])

  const tickedItemCount = useMemo(() => checklistItems.filter((x) => x.isChecked).length, [checklistItems])
  const untickedItems = useMemo(() => checklistItems.filter((x) => !x.isChecked), [checklistItems])

  const handleCardClicked = () => {
    navigate(`checklist-note/${props.id}`)
  }

  return (
    <Card onClick={handleCardClicked}>
      <CardContent>
        <S.Title>{props.title}</S.Title>

        <List>
          {untickedItems.map((untickedItem) => (
            <S.UntickedItem key={untickedItem.id} sx={{}}>
              {untickedItem.isChecked ? (
                <CheckBoxIcon color="disabled" />
              ) : (
                <CheckBoxOutlineBlankIcon color="disabled" />
              )}
              <S.ItemText>{untickedItem.text}</S.ItemText>
            </S.UntickedItem>
          ))}
        </List>

        {tickedItemCount > 0 && (
          <S.TickedItems>
            + {tickedItemCount} ticked {tickedItemCount === 1 ? 'item' : 'items'}
          </S.TickedItems>
        )}
      </CardContent>
    </Card>
  )
}

export default memo(ChecklistNoteOverview)
