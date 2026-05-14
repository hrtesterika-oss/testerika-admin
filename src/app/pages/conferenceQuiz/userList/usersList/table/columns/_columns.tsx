import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {SubjectCell} from './SubjectCell'
import { Type } from './Type'
import { UserType } from './UserType'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Quiz ID' className='min-w-125px' />,
  //   accessor: 'id',
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='First Name' className='min-w-125px' />
    ),
    id: 'first_name',
    Cell: ({...props}:any) => <UserInfoCell name={props.data[props.row.index].first_name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Last Name' className='min-w-125px' />
    ),
    id: 'last_name',
    Cell: ({...props}:any) => <UserInfoCell name={props.data[props.row.index].last_name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Email' className='min-w-125px' />
    ),
    id: 'email',
    Cell: ({...props}:any) => <SubjectCell name={props.data[props.row.index].email} />
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='User Type' className='min-w-125px' />
    ),
    id: 'user_type',
    Cell: ({...props}:any) => <UserType name={"Company"} />
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Phone Number' className='min-w-125px' />,
    id: 'Phone_number',
    Cell: ({...props}:any) => <UserInfoCell name={props.data[props.row.index].phone_number} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Joined At' className='min-w-125px' />,
    id: 'joined_at',
    Cell: ({...props}:any) => <Type date={props.data[props.row.index].createdAt} />,
  },
  
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Level' className='min-w-125px' />
  //   ),
  //   id: 'level',
  //   Cell: ({...props}) => <UserLastLoginCell level={props.data[props.row.index].level} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
  //   ),
  //   id: 'status',
  //   Cell: ({...props}) => (
  //     <UserTwoStepsCell
  //       status={props.data[props.row.index]}
  //       id={props.data[props.row.index].id}
  //     />
  //   ),
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Action' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}) => (
      <UserActionsCell
        id={props.data[props.row.index]}
      />
    ),
  },
]

export {usersColumns}
