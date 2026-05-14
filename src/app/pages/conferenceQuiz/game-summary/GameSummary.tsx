import axios from 'axios'
import {FC, useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {createPin, getResult, getQuizByPin, getUserById} from '../quizList/core/_requests'
import openSocket from 'socket.io-client'
import clsx from 'clsx'
import {useDispatch, useSelector} from 'react-redux'
import Confetti from 'react-confetti'
import {makeStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(2),
    color: 'green',
  },
}))

const GameSummary: FC = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {quiz, pin, users} = useSelector((state: any) => state.users)
  const location: any = useLocation()
  let key = location.search.split('?quiz_id=')[1]
  // const [quiz, setQuiz] = useState<any>(location.state.data)
  const [show, setShow] = useState(false)
  const [result, setResult] = useState<any>([])
  const classes = useStyles()
  const [completed, setCompleted] = useState(0)

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
        let totalUsers = users.length
        let totalQues = quiz.questions.length
        let totalQuestions = totalUsers * totalQues
        let totalattempted = data
          .map((item: any) => item.results.length)
          .reduce((prev: any, curr: any) => prev + curr, 0)
        let percentage = (totalattempted / totalQuestions) * 100
        percentage = percentage > 100 ? 100 : percentage
        setCompleted(percentage)
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
      <div
        style={{
          display: 'flex',
          alignSelf: 'flex-end',
          marginRight: '3%',
          marginTop: '1%',
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          padding: 10,
        }}
      >
        vj007sharma
      </div>
      <div className='row' style={{marginTop: '1%'}}>
        <div className='col-md-2' style={{alignItems: 'center', display: 'flex', marginLeft: 10}}>
          <button
            className='btn btn-lg btn-primary'
            onClick={() => navigate(`/conference-quiz/game-over${location.search}`)}
          >
            Back to podium
          </button>
        </div>
        <div className='col-md-10 row'>
          <div
            className='col-md-5'
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#271A6C',
              height: 200,
              borderRadius: 5,
            }}
          >
            <CircularProgress
              className={classes.progress}
              size={120}
              variant='static'
              value={completed}
            />
            <div style={{position: 'absolute', marginLeft: 50, marginTop: 10}}>
              <h1 style={{color: '#fff'}}>{completed.toFixed()} %</h1>
            </div>
            <div>
              <h1 style={{color: '#fff', fontSize: 30, marginBottom: 20}}>Perfection!</h1>
              <h3 style={{color: '#fff'}}>But can it stay this way?</h3>
              <button
                className='btn btn-sm btn-primary'
                onClick={() => navigate(`/conference-quiz/lobby${location.search}`)}
              >
                Play Again
              </button>
            </div>
          </div>
          <div
            className='col-md-3'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#271A6C',
              height: 200,
              borderRadius: 5,
              marginLeft: 20,
            }}
          >
            <button
              className='btn btn-sm btn-primary'
              onClick={() => window.open('http://localhost:3011/conference-quiz/list', '_blank')}
            >
              Get Feedback
            </button>
          </div>
          <div
            className='col-md-3'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#271A6C',
              height: 200,
              borderRadius: 5,
              marginLeft: 20,
            }}
          >
            <button
              className='btn btn-sm btn-primary'
              onClick={() => window.open('http://localhost:3011/conference-quiz/list', '_blank')}
            >
              Play new game
            </button>
          </div>
          <div
            style={{marginTop: '5%'}}
            onClick={() => {
              navigate(`/conference-quiz/summary/${pin.id}`)
            }}
          >
            <h3
              style={{
                color: '#fff',
                textAlign: 'end',
                marginRight: '10%',
                cursor: 'pointer',
              }}
            >
              View full report
            </h3>
          </div>
          <div
            className='col-md-11'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#271A6C',
              height: 300,
              borderRadius: 5,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: 20,
                textAlign: 'center',
              }}
            >
              <h1>
                Every question was answered <br /> correctly by most players.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {GameSummary}
