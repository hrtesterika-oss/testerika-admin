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

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='ID' className='min-w-125px' />,
  //   accessor: 'id',
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Program Name' className='min-w-125px' />
    ),
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Quiz' className='min-w-125px' />,
    id: 'quiz_id',
    Cell: ({...props}) => <SubjectCell quiz_id={props.data[props.row.index].quiz_id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Sponsors' className='min-w-125px' />
    ),
    id: 'sponsors',
    Cell: ({...props}) => <Type question_type={props.data[props.row.index].sponsors} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Co-sponsors' className='min-w-125px' />
    ),
    id: 'co-sponsors',
    Cell: ({...props}) => <UserLastLoginCell level={props.data[props.row.index].co_sponsors} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Sponsors Fee' className='min-w-125px' />
    ),
    id: 'sponsor_fee',
    Cell: ({...props}) => <UserLastLoginCell level={props.data[props.row.index].sponsor_fee} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='co sponsor fee' className='min-w-125px' />
    ),
    id: 'co_sponsor_fee',
    Cell: ({...props}) => <UserLastLoginCell level={props.data[props.row.index].co_sponsor_fee} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Active' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}) => (
      <UserTwoStepsCell
        status={props.data[props.row.index].status}
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
