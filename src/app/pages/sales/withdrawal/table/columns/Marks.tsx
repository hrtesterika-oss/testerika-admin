import { FC } from 'react'

type Props = {
    marks?: any
}

const Marks: FC<Props> = ({ marks }) => <div className='fw-bolder'>{marks}</div>

export { Marks }
