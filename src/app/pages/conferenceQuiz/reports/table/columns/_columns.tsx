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

const usersColumns: ReadonlyArray<Column<any>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Quiz Pin' className='min-w-125px' />,
    accessor: 'pin',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='No. of players' className='min-w-125px' />
    ),
    accessor: 'users.length',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Game Mode' className='min-w-125px' />
    ),
    accessor: 'game_mode',
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Date created' className='min-w-125px' />
    ),
    id: 'createdAt',
    Cell: ({...props}) => (
      <CommonCell wallet={props.data[props.row.index].createdAt?.split('T')[0]} />
    ),
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
    Cell: ({...props}) => (
      <UserActionsCell
        data={{key: props.data[props.row.index].key, id: props.data[props.row.index].id}}
      />
    ),
  },
]

export {usersColumns}
