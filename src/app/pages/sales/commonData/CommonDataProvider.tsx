import {FC, useState, createContext, useContext, useMemo, useEffect} from 'react'
import {getAllUsers, getQuiz} from '../withdrawal/core/_requests'
const CommonDataContext = createContext<any>({
  users: [],
  quiz: [],
})

const CommonDataProvider: FC = ({children}) => {
  const [users, setUsers] = useState<Array<any>>()
  const [quiz, setQuiz] = useState<Array<any>>()
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await getAllUsers()
      .then((data) => {
        setUsers(data)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
    await getQuiz()
      .then((data) => {
        setQuiz(data)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  return (
    <CommonDataContext.Provider
      value={{
        users,
        quiz,
      }}
    >
      {children}
    </CommonDataContext.Provider>
  )
}

const useCommonData = () => useContext(CommonDataContext)

export {CommonDataProvider, useCommonData}
