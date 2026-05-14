import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {CoursesCell} from './Courses'
import {SubjectCell} from './SubjectCell'
import { MarksCell } from './MarksCell'
import { QuizTypeCell } from './UserQuizTypeCell'

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
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Quiz Name' className='min-w-125px' />
    ),
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Courses' className='min-w-125px' />
    ),
    id: 'courses',
    Cell: ({...props}) => <CoursesCell courses={props.data[props.row.index].courses} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Subject' className='min-w-125px' />
    ),
    id: 'subject',
    Cell: ({...props}) => <SubjectCell subject_id={props.data[props.row.index].subject_id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Language' className='min-w-125px' />
    ),
    accessor: 'language',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='No.of Questions' className='min-w-125px' />
    ),
    accessor: 'total_questions',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Marks' className='min-w-125px' />
    ),
    id: 'marks',
    Cell: ({...props}) => <MarksCell marks={props.data[props.row.index].marks} />,
  },  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Quiz Type' className='min-w-125px' />
    ),
    id: 'quiz_type_id',
    Cell: ({...props}) => <QuizTypeCell quizTypeId={props.data[props.row.index].quiz_type_id} />,
  },  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Added Date' className='min-w-125px' />
    ),
    id: 'createdAt',
    Cell: ({...props}) => <UserLastLoginCell createdAt={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Active' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}) => (
      <UserTwoStepsCell
        status={props.data[props.row.index]}
        id={props.data[props.row.index].id}
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} data={props.data[props.row.index]}/>,
  },
]

export {usersColumns}
