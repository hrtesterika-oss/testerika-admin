import {FC, useState, createContext, useContext, useMemo, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getAllSubjects } from '../../quiz/users-list/core/_requests'
import axios from 'axios'
import { getAllCategories } from '../category-list/core/_requests'
import { getAllCourses } from '../course-list/core/_requests'
const CommonDataContext = createContext<any>({
  allCategory: [],
  getAllCourses:[]
})

const CommonDataProvider: FC = ({children}) => {
  const [allCategory, setAllCategory] = useState<Array<any>>()
  const [allCourses, setAllCourses] = useState<Array<any>>()

  useEffect(() => {
    getData()
  }, [])



  const getData = async () => {
    await getAllCategories()
      .then((data) => {
        setAllCategory(data)
      })
      .catch((err) => {
        console.log(err)
      })



      await getAllCourses()
      .then((data) => {
        setAllCourses(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonDataContext.Provider
      value={{
        allCategory,
        allCourses
      }}
    >
      {children}
    </CommonDataContext.Provider>
  )
}

const useCommonData = () => useContext(CommonDataContext)

export {CommonDataProvider, useCommonData}
