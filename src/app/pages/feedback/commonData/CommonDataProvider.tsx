import {FC, useState, createContext, useContext, useMemo, useEffect} from 'react'
import {getAllUsers} from '../booksList/core/_requests'
const CommonDataContext = createContext<any>({
  users: [],
})

const CommonDataProvider: FC = ({children}) => {
  const [users, setUsers] = useState<Array<any>>()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await getAllUsers()
      .then((data) => {
        setUsers(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonDataContext.Provider
      value={{
        users,
      }}
    >
      {children}
    </CommonDataContext.Provider>
  )
}

const useCommonData = () => useContext(CommonDataContext)

export {CommonDataProvider, useCommonData}
