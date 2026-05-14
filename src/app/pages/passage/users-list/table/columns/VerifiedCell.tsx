import {FC} from 'react'

type Props = {
  questions: any
}

const Verified: FC<Props> = ({questions}) => (
  <>
    {' '}
    {questions?.every((item: any) => item?.verified?.is_verified == 1) ? (
      <div className='badge badge-light-success fw-bolder'>Verified</div>
    ) :questions?.find((item:any)=>item?.verified?.is_verified===1)
      ?(<>
           <div className='badge badge-light-warning fw-bolder'>Partially Verified</div>
        </>)
     :(
      <>
        <div className='badge badge-light-danger fw-bolder'>Not Verified</div>
        <i
          className='fas fa-exclamation-circle ms-1 fs-7'
          data-bs-toggle='tooltip'
          title='All questions must be verified!'
        ></i>
      </>
    )}
  </>
)

export {Verified}
