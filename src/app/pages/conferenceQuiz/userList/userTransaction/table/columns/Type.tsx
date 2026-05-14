import {FC} from 'react'

type Props = {
  payment_status?: any
}

const Type: FC<Props> = ({payment_status}) => <div className='fw-bolder'>
       <span
          style={{borderRadius:"2px"}}
          className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
            payment_status?.paymentStatus?.trim()?.toLowerCase()=="success" || payment_status?.paymentStatus?.trim()?.toLowerCase()=="authorized" || payment_status?.paymentStatus?.trim()?.toLowerCase()=="captured" || payment_status?.paymentStatus?.trim()?.toLowerCase()=="paid"
              ? "text-success fw-bolder bg-success"
              : ""
          } 
          ${
            payment_status?.paymentStatus?.trim()?.toLowerCase() === "created" || payment_status?.paymentStatus?.trim()?.toLowerCase() === "attempted"
              ? "text-primary bg-primary"
              : ""
          }
          ${
            payment_status?.paymentStatus?.trim()?.toLowerCase() === "failed" || payment_status?.paymentStatus?.trim()?.toLowerCase() === "fail"
              ? "text-danger bg-danger"
              : ""
          }
          
          `}
        >
          {payment_status?.paymentStatus}
        </span>
  </div>

export {Type}
