import {FC} from 'react'

type Props = {
  question_type?: string
}

const Type: FC<Props> = ({question_type}) => <div className='fw-bolder'>{question_type}</div>

export {Type}
