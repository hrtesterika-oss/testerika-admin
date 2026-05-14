import {FC, useState, createContext, useContext, useMemo, useEffect} from 'react'
import {getAllCourses, getAllSubjects} from '../users-list/core/_requests'
const CommonDataContext = createContext<any>({
  allCourses: [],
  allSubjects: [],
})

const CommonDataProvider: FC = ({children}) => {
  const [allCourses, setCourses] = useState<Array<any>>()
  const [allSubjects, setSubjects] = useState<Array<any>>()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await getAllCourses()
      .then((data) => {
        setCourses(data)
      })
      .catch((err) => {
        console.log(err)
      })
    await getAllSubjects()
      .then((data) => {
        setSubjects(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonDataContext.Provider
      value={{
        allCourses,
        allSubjects,
      }}
    >
      {children}
    </CommonDataContext.Provider>
  )
}

const useCommonData = () => useContext(CommonDataContext)

export {CommonDataProvider, useCommonData}
