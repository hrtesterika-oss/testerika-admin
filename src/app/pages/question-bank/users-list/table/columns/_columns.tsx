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
import {Verified} from './VerifiedCell'
import { VerifiedBy } from './verifiedBy'
import { QuestionBankCell } from './QuestionBankId'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Q.Bank.ID' className='min-w-125px' />,
    accessor: 'id',
    Cell: ({...props}) => <QuestionBankCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='P.Bank.ID' className='min-w-125px' />,
    id: 'passage_bank_id',
    Cell: ({...props}:any) => <div>{props.data[props.row.index].passage_bank_id?props.data[props.row.index].passage_bank_id:"--"}</div>
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Question' className='min-w-125px' />
    ),
    id: 'question',
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
      <UserCustomHeader tableProps={props} title='Added Date' className='min-w-125px' />
    ),
    id: 'createdAt',
    Cell: ({...props}:any) => <UserLastLoginCell createdAt={props.data[props.row.index].createdAt} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Active' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}:any) => (
      <UserTwoStepsCell
        status={props.data[props.row.index].status}
        id={props.data[props.row.index].id}
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Verified' className='min-w-125px' />
    ),
    id: 'verified',
    Cell: ({...props}) => <Verified questions={props.data[props.row.index].questions} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Verified By' className='min-w-125px' />
    ),
    id: 'verified_by',
    Cell: ({...props}) => <VerifiedBy questions={props.data[props.row.index].questions} />,
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
