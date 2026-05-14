import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'

type Props = {
  assigned_to?: any
}

const AssignedTo: FC<Props> = ({assigned_to}) => (
  <>
    <div className='card-body d-flex flex-column justify-content-end pe-0'>
      <div className='symbol-group symbol-hover flex-nowrap'>
        {assigned_to?.slice(0, 5).map((item: any, i: any) => (
          <div
            key={i}
            className='symbol symbol-35px symbol-circle'
            data-bs-toggle='tooltip'
            title={`${item.first_name} ${item.last_name}`}
          >
            {item?.profile_image == null || item?.profile_image == '' ? (
              <span
                className='symbol-label text-inverse-warning fw-bolder'
                style={{backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`}}
              >
                {item?.first_name.charAt(0)}
              </span>
            ) : (
              <img alt='Pic' src={item.profile_image} />
            )}
          </div>
        ))}
        {assigned_to?.length > 5 && (
          <a
            href='#'
            className='symbol symbol-35px symbol-circle'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_view_users'
          >
            <span className='symbol-label bg-light text-gray-400 fs-8 fw-bolder'>
              +{assigned_to?.length - 5}
            </span>
          </a>
        )}
      </div>
    </div>
    <div className='modal fade' id='kt_modal_view_users' tabIndex={-1} aria-hidden='true'>
      <div className='modal-dialog mw-650px'>
        <div className='modal-content'>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
              <span className='svg-icon svg-icon-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <rect
                    opacity='0.5'
                    x='6'
                    y='17.3137'
                    width='16'
                    height='2'
                    rx='1'
                    transform='rotate(-45 6 17.3137)'
                    fill='currentColor'
                  />
                  <rect
                    x='7.41422'
                    y='6'
                    width='16'
                    height='2'
                    rx='1'
                    transform='rotate(45 7.41422 6)'
                    fill='currentColor'
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-13'>
              <h1 className='mb-3'>Browse Staffs</h1>
              <div className='text-muted fw-bold fs-5'>
                This role is assigned to following Staffs.
              </div>
            </div>
            <div className='mb-15'>
              <div className='mh-375px scroll-y me-n7 pe-7'>
                {assigned_to?.map((data: any, i: any) => {
                  return (
                    <div
                      key={i}
                      className='d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed'
                    >
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-35px symbol-circle'>
                          {/* {data?.profile_image != null ? (
                            <img alt='Pic' src={data?.profile_image} />
                          ) : (
                            <span
                              className='symbol-label text-inverse-warning fw-bold'
                              style={{
                                backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
                                  16
                                )}`,
                              }}
                            >
                              {data?.first_name.charAt(0)}
                            </span>
                          )} */}
                        </div>
                        <div className='ms-6'>
                          <a
                            href='#'
                            className='d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary'
                          >
                            {/* {data?.first_name} {data?.last_name} */}
                            <span className='badge badge-light fs-8 fw-bold ms-2'>
                              {data?.admin == 1 ? 'Admin' : ''}
                            </span>
                          </a>
                          {/* <div className='fw-bold text-muted'>{data?.email}</div> */}
                        </div>
                      </div>
                      <div className='d-flex'>
                        <div className='text-end'>
                          <div className='fs-5 fw-bolder text-dark'>$23,000</div>
                          {/* <div className='fs-7 text-muted'>{data?.phone_number}</div> */}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

export {AssignedTo}
