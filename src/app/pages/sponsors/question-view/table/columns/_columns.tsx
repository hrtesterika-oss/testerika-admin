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
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Program Name' className='min-w-125px' />
    ),
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Sponsor' className='min-w-125px' />
    ),
    id: 'sponsor',
    Cell: ({...props}) => <SubjectCell subject_id={props.data[props.row.index].sponsor_id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Type' className='min-w-125px' />,
    id: 'type',
    Cell: ({...props}) => <Type question_type={props.data[props.row.index].type} />,
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
      <UserCustomHeader tableProps={props} title='discount' className='min-w-125px' />
    ),
    id: 'discount',
    Cell: ({...props}) => <Marks marks={props.data[props.row.index].discount} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='net amount' className='min-w-125px' />
    ),
    id: 'net_amount',
    Cell: ({...props}) => <Marks marks={props.data[props.row.index].net_amount} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Action' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}) => <UserTwoStepsCell status={props.data[props.row.index].status} id={props.data[props.row.index].id} />
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
