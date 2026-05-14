import {FC, useEffect, useMemo, useRef, useState} from 'react'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {createAccountSchemas, initialUser, User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import {useCommonData} from '../../commonData/CommonDataProvider'
import ReactSelect from 'react-select'
import axios, {AxiosResponse} from 'axios'
import {API_URL} from '../../../settings/components/ApiUrl'
import ReactQuill from 'react-quill'

type Props = {
  isUserLoading: boolean
  role: User
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {allCourses} = useCommonData()
  const {refetch} = useQueryResponse()
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [selectedCourses, setSelectedCourses] = useState<any>(null)
  const [roleForEdit, setRoleForEdit] = useState<User>({
    ...role,
    id: role.id || initialUser.id,
    name: role.name || initialUser.name,
    description: role.description || initialUser.description,
    image: role.image || initialUser.image,
    book_pdf: role.book_pdf || initialUser.book_pdf,
    new_release: role.new_release || initialUser.new_release,
    courses: role.courses || initialUser.courses,
    type: role.type || initialUser.type,
    amount: role.amount || initialUser.amount,
  })
  const questionRef: any = useRef(null)

  useEffect(() => {
    if (roleForEdit.id && allCourses.length > 0) {
      const selected = allCourses.filter((x: any) =>
        roleForEdit?.courses.some((y: any) => y.course_id == x.id)
      )
      setSelectedCourses(selected)
    }
  }, [allCourses])

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const submitStep = async (values: User, actions: FormikValues) => {
    try {
      values.description = roleForEdit.description
      // await createUser(values)
      actions.resetForm()
      cancel(true)
      Swal.fire({
        title: 'Success!',
        text: `Book Updated!`,
        icon: 'success',
        confirmButtonText: 'Okay',
      })
    } catch (ex) {
      console.error(ex)
    } finally {
    }
  }

  const uploadImage = async (e: any) => {
    const file = e.currentTarget.files[0]
    const fd = new FormData()
    fd.append('image', file)
    await axios
      .post(`${API_URL}/upload`, fd)
      .then((data: AxiosResponse<any>) => {
        setRoleForEdit({...roleForEdit, image: data.data})
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  const imageHandler = (e: any) => {
    const input: any = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      var file: any = input?.files[0]
      var formData = new FormData()
      formData.append('image', file)
      await axios
        .post(`${API_URL}/upload`, formData)
        .then((data: AxiosResponse<any>) => {
          var range = questionRef.current.getEditor().getSelection()
          questionRef.current.getEditor().insertEmbed(range?.index, 'image', data.data)
        })
        .catch((err) => {
          console.log(err, 'err')
        })
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{header: [1, 2, 3, 4, 5, 6, false]}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  )

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]

  const rows = [...Array(Math.ceil(12 / 4))]
  // chunk the products into the array of rows
  const productRows = rows.map((row, idx) =>
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].slice(idx * 4, idx * 4 + 4)
  )
  // map the rows as div.row
  const content = productRows.map((row, idx) => (
    <div className='row' key={idx}>
      {row.map((product) => (
        <div
          style={{
            height: 150,
            width: 150,
            border: '1px solid rgba(0, 0, 0, 0.05)',
            marginRight: 10,
            marginTop: 10,
          }}
        >
          <h2 className='pt-2' style={{textAlign: 'center'}}>
            New Quiz
          </h2>
          <button style={{textAlign: 'center'}}>Create</button>
        </div>
      ))}
    </div>
  ))

  return (
    <>
      <div className='stepper stepper-links d-flex flex-column' id='kt_create_account_stepper'>
        <div className='d-flex flex-row'>
          {content}
          {/* <div
            style={{
              height: 100,
              width: 100,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              border: '#000',
            }}
          >
            <h2>New Quiz</h2>
            <button>Create</button>
          </div> */}
        </div>
      </div>
      {isUserLoading && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
