import {Column} from 'react-table'
import {UserInfoCell} from './CouponCode'
import {UserTwoStepsCell} from './Status'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {MaxUser} from './MaxUser'
import {StartDate} from './StartDate'
import {CouponTitle} from './CouponTitle'
import {QuestionBankCell} from "./QuestionBankId"
import {ExpDate} from './ExpDate'
import { DisplayQuestions } from './DisplayQuestions'
import { SubjectCell } from './Subjects'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Q.Bank.ID' className='min-w-125px' />
    ),
    id: 'id',
    Cell: ({...props}:any) => <QuestionBankCell id={props.data[props.row.index]?.id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='P.Bank.ID' className='min-w-125px' />
    ),
    id: 'passage_bank_id',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index]?.passage_bank_id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Questions' className='min-w-125px' />
    ),
    id: 'questions',
    Cell: ({...props}:any) => <DisplayQuestions questions={props.data[props.row.index].questions} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Subject' className='min-w-125px' />
    ),
    id: 'courses',
    Cell: ({...props}:any) => <SubjectCell subject_id={props.data[props.row.index]?.subject_id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Marks' className='min-w-125px' />
    ),
    id: 'question_marks',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index]?.marks?.marks} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Negative Marks' className='min-w-125px' />
    ),
    id: 'question_marks_negative',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index]?.marks?.negative_marks} />,
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Created At' className='min-w-125px' />
  //   ),
  //   id: 'start_date',
  //   Cell: ({...props}:any) => (
  //     <StartDate start_date={props.data[props.row.index]?.createdAt} />
  //   ),
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Exp. Date' className='min-w-125px' />
  //   ),
  //   id: 'exp_date',
  //   Cell: ({...props}) => <ExpDate exp_date={props.data[props.row.index].coupon_dates?.exp_date} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Actions' className='min-w-125px' />
  //   ),
  //   id: 'Action',
  //   Cell: ({...props}:any) => (
  //     <UserTwoStepsCell
  //        status={props.data[props.row.index]}
  //        id={props.data[props.row.index].id}
  //     />
  //   ),
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
  //   ),
  //   id: 'actions',
  //   Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  // },
]

export {usersColumns}
