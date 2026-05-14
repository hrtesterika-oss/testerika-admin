import {FC} from 'react'
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
  email?: any
}

const CreatedBy: FC<Props> = ({email}) => <div className='fw-bolder'>
  <BootstrapTooltip title={`${email?.tblconference_user?.email}`}>
        <Button className="text-primary" style={{fontSize:"14px",fontWeight:"600",textTransform:"lowercase"}}>{
          `${email?.tblconference_user?.email.substring(0,15)}...`
        }</Button>
      </BootstrapTooltip>
  </div>

export {CreatedBy}
