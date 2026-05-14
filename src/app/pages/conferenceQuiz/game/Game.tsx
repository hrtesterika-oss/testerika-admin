import axios from 'axios'
import {FC, useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {createPin, getUserById} from '../quizList/core/_requests'
import openSocket from 'socket.io-client'
import {useDispatch, useSelector} from 'react-redux'

const Game: FC = () => {
  const navigate = useNavigate()
  const location: any = useLocation()
  const dispatch = useDispatch()
  const {quiz} = useSelector((state: any) => state.users)
  let key = location.search.split('?quiz_id=')[1]
  const [count, setCount] = useState<any>(5)
  const [counter, setCounter] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setCounter(true)
    }, 3000)
  }, [])

  useEffect(() => {
    if (!quiz?.id) {
      navigate(`/conference-quiz/${key}`)
    }
    const onConfirmRefresh = function (event: any) {
      event.preventDefault()
      return (event.returnValue = 'Are you sure you want to leave the page?')
    }

    window.addEventListener('beforeunload', onConfirmRefresh, {capture: true})

    return () => {
      window.removeEventListener('beforeunload', onConfirmRefresh)
    }
  }, [])

  useEffect(() => {
    if (quiz.id) {
      window.history.pushState(null, '', location.pathname + location.search)
      window.addEventListener('popstate', onBackButtonEvent)
    }
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent)
    }
  }, [])

  const onBackButtonEvent = (e: any) => {
    if (e.state) {
      if (window.confirm('Do you want to go back ?')) {
        navigate(`/conference-quiz/${key}`)
      } else {
        window.history.pushState(null, '', `/conference-quiz/lobby${location.search}`)
      }
    }
  }

  useEffect(() => {
    if (count == 0) {
      navigate(`/conference-quiz/game-start${location.search}`)
    }
    let timer: any = count > 0 && counter && setInterval(() => setCount(count - 1), 1000)
    return () => clearInterval(timer)
  }, [count, counter])

  return (
    <div
      className=''
      style={{
        backgroundColor: '#472890',
        height: 610,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {counter ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 10,
            width: 150,
            height: 100,
            borderRadius: 5,
            fontWeight: 'bolder',
            fontSize: 30,
          }}
        >
          {count == 0 ? 'Go' : count}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 10,
            height: 60,
            borderRadius: 5,
            fontWeight: 'bolder',
            fontSize: 20,
          }}
        >
          {quiz?.name}
        </div>
      )}
    </div>
  )
}

export {Game}
