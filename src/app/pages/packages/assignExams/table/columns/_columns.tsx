import {Column} from 'react-table'
import {UserInfoCell} from './CouponCode'
import {UsedSoFar} from './UsedSoFar'
import {UserTwoStepsCell} from './Status'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {Percentage} from './Percentage'
import {MaxUser} from './MaxUser'
import {StartDate} from './StartDate'
import {CouponTitle} from './CouponTitle'
import {ExpDate} from './ExpDate'
import { PackagesCourse } from './PackagesCourse'
import { AssignExamDetail } from './AssignExamDetail'
import { ExamTypeSubPackages } from './ExamTypeSubPackages'

const usersColumns: ReadonlyArray<Column<User>> = [
  // {
  //   Header: (props) => <UserSelectionHeader tableProps={props} />,
  //   id: 'selection',
  //   Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Exam Name' className='min-w-125px' />
    ),
    id: 'exam_name',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Exam Type' className='min-w-125px' />
    ),
    id: 'exam_type',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props?.data[props.row.index]?.tblexamtype?.name?props?.data[props.row.index]?.tblexamtype?.name:""} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Exam Duration' className='min-w-125px' />
    ),
    id: 'exam_duration',
    Cell: ({...props}:any) => <CouponTitle coupon_title={`${props.data[props.row.index].exam_duration} minutes`} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Total Questions' className='min-w-125px' />
    ),
    id: 'total_questions',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].total_questions} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Total Marks' className='min-w-125px' />
    ),
    id: 'total_marks',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].total_marks} />,
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Created AT' className='min-w-125px' />
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
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Premium' className='min-w-125px' />
    ),
    id: 'premium_or_free',
    Cell: ({...props}:any) => (
      <ExamTypeSubPackages
         status={props.data[props.row.index]}
         id={props.data[props.row.index].id}
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}:any) => (
      <UserTwoStepsCell
         status={props.data[props.row.index]}
         id={props.data[props.row.index].id}
      />
    ),
  }
]

export {usersColumns}
