import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function BasicMenu({actionTaken,row,permissionList}:any) {
  const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{color:"blue",fontWeight:"600"}}
      >
        <BsThreeDotsVertical style={{transform:"scale(2)",color:"black"}}/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       {permissionList?.can_edit && <MenuItem style={{color:"black",fontWeight:"600"}} onClick={()=>{
           actionTaken("edit",row)
           handleClose()
        }}>Edit</MenuItem>}
       {permissionList?.can_view && <MenuItem style={{color:"black",fontWeight:"600"}} onClick={()=>{
          navigate(`/conference-quiz/quizzes/list/${row?.id}`)
        }} >View All Quizzes</MenuItem>}
       {permissionList?.can_view && <MenuItem style={{color:"black",fontWeight:"600"}} onClick={()=>{
        navigate(`/conference-quiz/polls/${row?.id}`)
       }}>View All Polls</MenuItem>}
       {permissionList?.can_view && <MenuItem style={{color:"black",fontWeight:"600"}} onClick={()=>{
          navigate(`/conference-quiz/transaction-history`,{state:{email:row?.email,id:row?.id}})
        }}>View All Transactions</MenuItem>}
      </Menu>
    </div>
  );
}