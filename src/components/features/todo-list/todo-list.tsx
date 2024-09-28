import { memo } from 'react'
import s from './todo-list.module.scss'
import type { ChecklistNote } from '../../../db/schema/checklist-notes'

type TodoListProps = ChecklistNote

function TodoList(props: TodoListProps) {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <h2>{props.title}</h2>
        <p>{props.json}</p>
      </div>
    </div>
  )
}

export default memo(TodoList)
