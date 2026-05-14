import {FC} from 'react'

type Props = {
  questions: any
}

const VerifiedBy: FC<Props> = ({questions}) => (
  <>
    {' '}
    {questions?.every((item: any) => item?.verified?.is_verified===1) ? (
      <div className='badge badge-light-success fw-bolder'>{questions?.slice(0,1)?.map((item: any) => item?.verified?.verified_by)[0]}</div>
    ) : (
      <>
        <div className='badge badge-light-danger fw-bolder'>Not Verified Yet</div>
        {/* <i
          className='fas fa-exclamation-circle ms-1 fs-7'
          data-bs-toggle='tooltip'
          title='All questions must be verified!'
        ></i> */}
      </>
    )}
  </>
)

export {VerifiedBy}