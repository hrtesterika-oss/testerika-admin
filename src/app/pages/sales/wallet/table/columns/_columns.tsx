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
    Header: (props) => <UserCustomHeader tableProps={props} title='User' className='min-w-125px' />,
    id: 'user_id',
    Cell: ({...props}) => <WalletInfo user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Quiz' className='min-w-125px' />,
    id: 'quiz_id',
    Cell: ({...props}) => <QuizCell quiz_id={props.data[props.row.index].quiz_id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Gross Amount' className='min-w-125px' />
    ),
    accessor: 'gross_amount',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Coupon Amount' className='min-w-125px' />
    ),
    id: 'coupon_amount',
    Cell: ({...props}) => <CommonCell wallet={props.data[props.row.index].coupon_amount} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Net Amount' className='min-w-125px' />
    ),
    accessor: 'amount',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Type' className='min-w-125px' />,
    accessor: 'type',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Transaction Id' className='min-w-125px' />
    ),
    accessor: 'transaction_id',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Coupon Code' className='min-w-125px' />
    ),
    id: 'coupon_code',
    Cell: ({...props}) => <CommonCell wallet={props.data[props.row.index].coupon_code} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Narration' className='min-w-125px' />
    ),
    accessor: 'narration',
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
      <UserCustomHeader tableProps={props} title='Date updated' className='min-w-125px' />
    ),
    id: 'updatedAt',
    Cell: ({...props}) => (
      <CommonCell wallet={props.data[props.row.index].updatedAt.split('T')[0]} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    accessor: 'transaction_status',
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
