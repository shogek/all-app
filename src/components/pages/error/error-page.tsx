import { useRouteError } from 'react-router-dom'
import * as S from './error-page.styles'

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any
  console.error(error)

  return (
    <S.Wrapper>
      <S.Content>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </S.Content>
    </S.Wrapper>
  )
}
