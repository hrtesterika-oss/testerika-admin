/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {User} from '../../core/_models'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
type Props = {
  name: any
}

const EmployeeDetail: FC<Props> = ({name}) => {
  // const {allCourses} = useCommonData()

  // const selected = allCourses?.filter((x: any) => courses?.some((y: any) => y.course_id == x.id))

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
      <BootstrapTooltip title={`${name}`}>
        <Button style={{color:"#775555",fontSize:"13px",fontWeight:"600",textTransform:"none"}}>{
          name?.length>9 ? `${name.substring(0,9)}...`:`${name}`
        }</Button>
      </BootstrapTooltip>
      </div>
    </div>
  )
}

export {EmployeeDetail}


