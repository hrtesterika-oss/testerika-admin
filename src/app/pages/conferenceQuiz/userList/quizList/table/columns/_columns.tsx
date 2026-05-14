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

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Quiz ID' className='min-w-125px' />,
    accessor: 'id',
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Question' className='min-w-125px' />
  //   ),
  //   id: 'questions',
  //   Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Quiz Name' className='min-w-125px' />
    ),
    id: 'subject',
    Cell: ({...props}) => <SubjectCell name={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Total Questions' className='min-w-125px' />,
    id: 'question_type',
    Cell: ({...props}) => <Type total_questions={props.data[props.row.index].questions?.length} />,
  },
  
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Level' className='min-w-125px' />
  //   ),
  //   id: 'level',
  //   Cell: ({...props}) => <UserLastLoginCell level={props.data[props.row.index].level} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({...props}) => (
      <UserTwoStepsCell
        status={props.data[props.row.index]}
        id={props.data[props.row.index].id}
      />
    ),
  },
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
