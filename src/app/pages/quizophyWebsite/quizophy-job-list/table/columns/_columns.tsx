import {Column} from 'react-table'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {EmployeeDetailStatus} from './EmployeeDetailStatus'
import {EmployeeDetail} from './EmployeeDetail'
import {CommonCell} from './CommonCell'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Job Profile' className='min-w-125px' />,
    // accessor: 'name',
    id: 'profile',
    Cell: ({...props}:any) => <EmployeeDetail name={props.data[props.row.index].profile} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Vacancies' className='min-w-125px' />,
    // accessor: 'email',
    id: 'vacancies',
    Cell: ({...props}:any) => <EmployeeDetail name={props.data[props.row.index].vacancies} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Work Status' className='min-w-125px' />,
    // accessor: 'email',
    id: 'work_status',
    Cell: ({...props}:any) => <EmployeeDetail name={props.data[props.row.index].work_status} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Experience Required' className='min-w-125px' />,
    // accessor: 'email',
    id: 'experience',
    Cell: ({...props}:any) => <EmployeeDetail name={props.data[props.row.index].experience} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Location' className='min-w-125px' />,
    // accessor: 'email',
    id: 'location',
    Cell: ({...props}:any) => <EmployeeDetail name={props.data[props.row.index].location} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Notice Period' className='min-w-125px' />,
    // accessor: 'email',
    id: 'notice_period',
    Cell: ({...props}:any) => <EmployeeDetail name={props.data[props.row.index].notice_period} />,
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Active' className='min-w-125px' />,
  //   // accessor: 'email',
  //   id: 'active',
  //   Cell: ({...props}:any) => <EmployeeDetail name={props.data[props.row.index].active} />,
  // },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Notice Period' className='min-w-125px' />,
  //   // accessor: 'email',
  //   id: 'notice_period',
  //   Cell: ({...props}:any) => <EmployeeDetail name={props.data[props.row.index].notice_period} />,
  // },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Profile Status' className='min-w-125px' />,
  //   // accessor: 'name',
  //   id: 'job_status',
  //   Cell: ({...props}:any) => <EmployeeDetailStatus name={props.data[props.row.index].job_status} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Course' className='min-w-125px' />
  //   ),
  //   id: 'courses',
  //   Cell: ({...props}) => <QuizCell courses={props.data[props.row.index].courses} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='No. of questions' className='min-w-125px' />
  //   ),
  //   id: 'questions',
  //   Cell: ({...props}) => <CommonCell wallet={props.data[props.row.index]} />,
  // },

  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Date created' className='min-w-125px' />
  //   ),
  //   id: 'createdAt',
  //   Cell: ({...props}) => (
  //     <CommonCell wallet={props?.data[props?.row?.index]?.createdAt?.split('T')[0]} />
  //   ),
  // },

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
    Cell: ({...props}) => (
      <UserActionsCell
        data={{data: props.data[props.row.index]}}
      />
    ),
  },
]

export {usersColumns}
