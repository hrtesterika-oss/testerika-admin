import {FC} from 'react'

type Props = {
  total_questions?: any
}

const Type: FC<Props> = ({total_questions}) => <div className='fw-bolder'>{total_questions}</div>

export {Type}
