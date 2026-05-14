import {Column} from 'react-table'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {WalletInfo} from './WalletInfo'
import {QuizCell} from './QuizCell'
import {CommonCell} from './CommonCell'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    accessor: 'name',
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Course' className='min-w-125px' />
  //   ),
  //   id: 'courses',
  //   Cell: ({...props}) => <QuizCell courses={props.data[props.row.index].courses} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='No. of questions' className='min-w-125px' />
    ),
    id: 'questions',
    Cell: ({...props}:any) => <CommonCell wallet={props.data[props.row.index].questions?.length} />,
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Date created' className='min-w-125px' />
    ),
    id: 'createdAt',
    Cell: ({...props}:any) => (
      <CommonCell wallet={props?.data[props?.row?.index]?.createdAt?.split('T')[0]} />
    ),
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
    Cell: ({...props}:any) => (
      <UserActionsCell
        data={{key: props.data[props.row.index].key, id: props.data[props.row.index].id}}
      />
    ),
  },
]

export {usersColumns}
