import {FC} from 'react'

type Props = {
  used_so_far?: any
}

const UsedSoFar: FC<Props> = ({used_so_far}) => (
  <div className='fw-bolder'>{used_so_far}</div>
)

export {UsedSoFar}
