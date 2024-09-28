import s from './error-page.module.scss'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any
  console.error(error)

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  )
}
