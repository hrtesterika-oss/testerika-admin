/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  stringifyRequestQuery,
} from '../../../../../_metronic/helpers'
import {getAllQuestionsPresentInSection, getUsers} from './_requests'
import {User} from './_models'
import {useQueryRequest} from './QueryRequestProvider'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const QueryResponseContext = createResponseContext<User>(initialQueryResponse)
const QueryResponseProvider: FC = ({children}) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])
  const params=useParams()
  const dispatch=useDispatch()
  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }

  }, [updatedQuery])
  const getAllQuestioPresentData=async (section_id:any)=>{
     const {data}=await getAllQuestionsPresentInSection(section_id)
     if(data?.success){
      dispatch({type:"addExamSectionQuestions",payload:data?.questionPresent})
     }else{
      dispatch({type:"addExamSectionQuestions",payload:[]})
     }
  }
  useEffect(()=>{
       if(params?.section_id){
          getAllQuestioPresentData(params?.section_id)
       }
  },[params])
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.USERS_LIST}-${query}`,
    () => {
        return getUsers(query,params?.id,params?.section_id)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const {response} = useQueryResponse()
  if (!response || !response.payload || !response.payload.pagination) {
    return defaultPaginationState
  }

  return response.payload.pagination
}

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
