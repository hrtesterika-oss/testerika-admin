import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Father Name' className='min-w-125px' />,
  //   accessor: 'fathername',
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Email' className='min-w-125px' />
    ),
    id: 'email',
    Cell: ({...props}) => <UserLastLoginCell last_login={props.data[props.row.index].email} />,
  },
  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Phone' className='min-w-125px' />
    ),
    id: 'phone',
    Cell: ({...props}) => <UserLastLoginCell last_login={props.data[props.row.index].phone} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='User Type' className='min-w-125px' />
    ),
    id: 'userType',
    Cell: ({...props}:any) => <UserLastLoginCell last_login={props.data[props.row.index].userType?.toUpperCase()} />,
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Two steps' className='min-w-125px' />
  //   ),
  //   id: 'dob',
  //   Cell: ({...props}) => <UserTwoStepsCell two_steps={props.data[props.row.index].dob} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Gender' className='min-w-125px' />
    ),
    accessor: 'gender',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({...props}:any) => (
      <UserTwoStepsCell
        status={props.data[props.row.index]?.status}
        id={props.data[props.row.index].id}
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}:any) => <UserActionsCell id={props.data[props.row.index].id} data={props.data[props.row.index]} />,
  },
]

export {usersColumns}
