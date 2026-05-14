import {FC, useState, createContext, useContext, useMemo, useEffect} from 'react'
import {getAllCourses} from '../booksList/core/_requests'
const CommonDataContext = createContext<any>({
  allCourses: [],
})

const CommonDataProvider: FC = ({children}) => {
  const [allCourses, setCourses] = useState<Array<any>>()

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
  }

  return (
    <CommonDataContext.Provider
      value={{
        allCourses,
      }}
    >
      {children}
    </CommonDataContext.Provider>
  )
}

const useCommonData = () => useContext(CommonDataContext)

export {CommonDataProvider, useCommonData}
