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
import {Type} from './Type'
import {Marks} from './Marks'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='User' className='min-w-125px' />,
    id: 'user',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Upi' className='min-w-125px' />,
    id: 'upi',
    Cell: ({...props}) => <SubjectCell subject_id={props.data[props.row.index].upi_id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='amount' className='min-w-125px' />
    ),
    id: 'amount',
    Cell: ({...props}) => <UserLastLoginCell level={props.data[props.row.index].amount} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Account No' className='min-w-125px' />
    ),
    id: 'account_number',
    Cell: ({...props}) => <Type question_type={props.data[props.row.index].account_number} />,
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='ifsc code' className='min-w-125px' />
    ),
    id: 'ifsc_code',
    Cell: ({...props}) => <Marks marks={props.data[props.row.index].ifsc_code} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='branch name' className='min-w-125px' />
    ),
    id: 'branch_name',
    Cell: ({...props}) => <Marks marks={props.data[props.row.index].branch_name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Created Date' className='min-w-125px' />
    ),
    id: 'createdAt',
    Cell: ({...props}) => <Marks marks={props.data[props.row.index].createdAt.split('T')[0]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'withdraw_status',
    Cell: ({...props}) => (
      <UserTwoStepsCell
        status={props.data[props.row.index].withdraw_status}
        id={props.data[props.row.index].id}
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
