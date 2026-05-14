import {FC, useState, createContext, useContext, useMemo, useEffect} from 'react'
const CommonDataContext = createContext<any>({
  users: [],
})

const CommonDataProvider: FC = ({children}) => {
  const [users, setUsers] = useState<any>([])

  return (
    <CommonDataContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </CommonDataContext.Provider>
  )
}

const useCommonData = () => useContext(CommonDataContext)

export {CommonDataProvider, useCommonData}
