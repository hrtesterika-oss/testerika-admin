import {FC, useState, createContext, useContext, useMemo, useEffect} from 'react'
import {getPrograms, getSponsors} from './_requests'
const CommonDataContext = createContext<any>({
  sponsors: [],
  programs: [],
})

const CommonDataProvider: FC = ({children}) => {
  const [sponsors, setSponsors] = useState<Array<any>>()
  const [programs, setPrograms] = useState<Array<any>>()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await getSponsors()
      .then((data) => {
        setSponsors(data)
      })
      .catch((err) => {
        console.log(err)
      })
    await getPrograms()
      .then((data) => {
        setPrograms(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonDataContext.Provider
      value={{
        sponsors,
        programs,
      }}
    >
      {children}
    </CommonDataContext.Provider>
  )
}

const useCommonData = () => useContext(CommonDataContext)

export {CommonDataProvider, useCommonData}
