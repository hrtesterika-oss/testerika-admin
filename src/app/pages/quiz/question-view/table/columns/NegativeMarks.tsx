import { FC } from 'react'

type Props = {
    marks?: any
}

const NegativeMarks: FC<Props> = ({ marks }) => <div className='fw-bolder'>{marks?.negative_marks}</div>

export { NegativeMarks }
