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

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Category_Id' className='min-w-125px' />
    ),
    id: 'id',
    Cell: ({...props}) => <SubjectCell course_id={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Course category' className='min-w-125px' />
    ),
    id: 'course_category',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='slug' className='min-w-125px' />,
    accessor: 'slug',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='image' className='min-w-125px' />
    ),
    id: 'co-image',
    Cell: ({...props}) => <UserLastLoginCell image={props.data[props.row.index].image} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Position' className='min-w-125px' />
    ),
    accessor: 'position',
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
