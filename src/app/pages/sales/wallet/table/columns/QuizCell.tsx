/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useCommonData} from '../../../commonData/CommonDataProvider'
import {User} from '../../core/_models'

type Props = {
  quiz_id: User
}

const QuizCell: FC<Props> = ({quiz_id}) => {
  const {quiz} = useCommonData()

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>{quiz?.find((x: any) => x.id == quiz_id)?.name}</div>
    </div>
  )
}

export {QuizCell}
