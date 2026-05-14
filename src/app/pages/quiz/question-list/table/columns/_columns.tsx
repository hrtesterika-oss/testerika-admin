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
import { QuestionMarks } from './QuestionMarks'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Q.Bank.ID' className='min-w-125px' />,
    accessor: 'id',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Question' className='min-w-125px' />
    ),
    id: 'questions',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Subject' className='min-w-125px' />
    ),
    id: 'subject',
    Cell: ({...props}) => <SubjectCell subject_id={props.data[props.row.index].subject_id} />,
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Type' className='min-w-125px' />,
  //   id: 'question_type',
  //   Cell: ({...props}:any) => <Type question_type={props.data[props.row.index]?.question_type} />,
  // },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Marks' className='min-w-125px' />,
    id: 'question_marks',
    Cell: ({...props}:any) => <QuestionMarks question_marks={props.data[props.row.index]?.marks?.marks} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Negative Marks' className='min-w-125px' />,
    id: 'question_negative_marks',
    Cell: ({...props}:any) => <QuestionMarks question_marks={props.data[props.row.index]?.marks?.negative_marks} />,
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Level' className='min-w-125px' />
  //   ),
  //   id: 'level',
  //   Cell: ({...props}:any) => <UserLastLoginCell level={props.data[props.row.index].level} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Action' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}) => (
      <UserTwoStepsCell
        id={props.data[props.row.index].id}
      />
    ),
  },
]

export {usersColumns}
