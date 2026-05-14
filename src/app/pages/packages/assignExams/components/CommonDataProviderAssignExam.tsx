import {FC, useState, createContext, useContext, useMemo, useEffect} from 'react'
import { getAssignedExamById } from '../core/_requests'
import { useParams } from 'react-router-dom'
const CommonDataContext = createContext<any>({
  allCourses: [],
  allSubjects: [],
})

const CommonDataProviderAssignExam: FC = ({children}) => {
  const [assignExams, setAssignExams] = useState<Array<any>>()
  const params=useParams()
  useEffect(() => {
    if(params?.id){
        getData()
    }
  }, [params])

  const getData = async () => {
    await getAssignedExamById(params?.id)
      .then((data) => {
        setAssignExams(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonDataContext.Provider
      value={{
        assignExams,
        setAssignExams
      }}
    >
      {children}
    </CommonDataContext.Provider>
  )
}

const useCommonData = () => useContext(CommonDataContext)

export {CommonDataProviderAssignExam, useCommonData}
