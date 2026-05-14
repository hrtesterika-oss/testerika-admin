import {FC} from 'react'

type Props = {
  image?: string
}

const UserLastLoginCell: FC<Props> = ({image}) => (
  <div className='d-flex align-items-center'>
    <img
      className='d-flex flex-column'
      src={image}
      style={{height: 30, width: 30, borderRadius: 60}}
    ></img>
  </div>
)

export {UserLastLoginCell}
