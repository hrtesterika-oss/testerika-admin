import axios from 'axios'
import {FC, useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {getResult} from '../quizList/core/_requests'
import openSocket from 'socket.io-client'
import clsx from 'clsx'
import {useDispatch, useSelector} from 'react-redux'
import Confetti from 'react-confetti'

const GameOver: FC = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {quiz, pin, users} = useSelector((state: any) => state.users)
  const location: any = useLocation()
  let key = location.search.split('?quiz_id=')[1]
  // const [quiz, setQuiz] = useState<any>(location.state.data)
  const [show, setShow] = useState(false)
  const [result, setResult] = useState<any>([])

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
    getResult({id: pin.id, quiz_id: quiz.id})
      .then((data: any) => {
        // dispatch({type: 'GETQUIZ', payload: data})
        setResult(data)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }, [])

  return (
    <div
      className=''
      style={{
        backgroundColor: '#472890',
        minHeight: 610,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Confetti width={1220} height={423} />
      <div style={{display: 'flex', alignSelf: 'flex-end', marginRight: '3%', marginTop: '1%'}}>
        <button
          className='btn btn-sm btn-primary'
          onClick={() => {
            navigate(`/conference-quiz/game-summary${location.search}`)
          }}
        >
          Next
        </button>
      </div>
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 10,
          height: 50,
          borderRadius: 5,
          alignSelf: 'center',
        }}
      >
        <h1>{quiz?.name}</h1>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          // alignItems: 'flex-end',
          // alignSelf:'flex-end',
          marginTop: '20%',
        }}
      >
        <div
          style={{
            height: 280,
            width: '12%',
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: 'white',
            textAlign: 'center',
          }}
        >
          <h2>2nd</h2>
          <h1>{result.length > 0 && result[1]?.nickname}</h1>
        </div>
        <div
          style={{
            height: 280,
            width: '12%',
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: 'white',
            textAlign: 'center',
          }}
        >
          <h2>1st</h2>
          <h1>{result.length > 0 && result[0]?.nickname}</h1>
        </div>
        <div
          style={{
            height: 280,
            width: '12%',
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: 'white',
            textAlign: 'center',
          }}
        >
          <h2>3rd</h2>
          <h1>{result.length > 0 && result[2]?.nickname}</h1>
        </div>
      </div>
    </div>
  )
}

export {GameOver}
