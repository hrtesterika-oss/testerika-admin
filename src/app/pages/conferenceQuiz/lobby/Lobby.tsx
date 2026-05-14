import {FC, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import openSocket from 'socket.io-client'
import {useDispatch, useSelector} from 'react-redux'
import {startQuiz} from '../quizList/core/_requests'
import QRCode from 'react-qr-code'

const Lobby: FC = () => {
  const dispatch = useDispatch()
  const {users, pin, quiz} = useSelector((state: any) => state.users)
  const navigate = useNavigate()
  const location: any = useLocation()
  const key = location.search.split('=')[1]
  const apiUrl = 'https://api.testerika.com'
  const socket = openSocket(apiUrl, {transports: ['websocket'], secure: true})
  const [qrValue, setQrValue] = useState<string>(`http://localhost:3000/${pin.pin}`)

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
    getSocketData()

    return () => {
      socket.disconnect()
    }
  }, [])

  const getSocketData = async () => {
    socket.on('user', (data) => {
      dispatch({type: 'JOIN', payload: data})
    })
  }

  const start = () => {
    startQuiz(quiz.key)
      .then((data: any) => {
        if (data?.id) {
          dispatch({type: 'REMOVEUSERANS', payload: []})
          navigate(`/conference-quiz/game${location.search}`)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='' style={{backgroundColor: '#472890', height: 610}}>
      <div style={{backgroundColor: '#271A6C', height: 150}} className='p-5'>
        <div
          className='text-center bg-white mx-auto'
          style={{
            width: '40%',
            height: 100,
            borderRadius: 5,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <div
            onClick={() => {
              navigator.clipboard.writeText(`http://localhost:3000/${pin.pin}`)
            }}
          >
            <h1>Game PIN:</h1>
            <h1 style={{fontSize: 50, fontWeight: 'bolder'}}>{pin.pin}</h1>
          </div>
          <QRCode value={qrValue} size={100} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <div
          style={{
            backgroundColor: '#1F0D40',
            height: 40,
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            borderRadius: 5,
          }}
        >
          <h1 style={{color: '#fff'}}>{users?.length}</h1>
        </div>
        <div>
          <h1 style={{color: '#fff', fontSize: 50}}>Quiz</h1>
        </div>
        <div>
          <button
            className='btn btn-sm btn-primary mt-5'
            disabled={users.length == 0}
            type='button'
            onClick={start}
          >
            Start
          </button>
        </div>
      </div>
      {users.length == 0 ? (
        <div
          className='text-center mx-auto pt-2'
          style={{
            backgroundColor: '#230F47',
            width: 230,
            height: 40,
            borderRadius: 5,
            marginTop: '15%',
          }}
        >
          <h2 style={{color: '#fff'}}>Waiting for players...</h2>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '15%',
          }}
        >
          {users?.map((user: any, i: any) => (
            <div
              key={i}
              className='text-center'
              style={{
                backgroundColor: '#230F47',
                height: 40,
                padding: 10,
                borderRadius: 5,
                marginLeft: 10,
              }}
            >
              <h2 style={{color: '#fff'}}>{user.nickname}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export {Lobby}

