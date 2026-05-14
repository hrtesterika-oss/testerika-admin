import axios from 'axios'
import {FC, useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {createPin, getSummary, getUserById} from '../quizList/core/_requests'
import openSocket from 'socket.io-client'
import {useDispatch, useSelector} from 'react-redux'
import {CircularProgress, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  progress: {
    // margin: theme.spacing(2),
    color: 'green',
  },
}))

const Summary: FC = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const location: any = useLocation()
  const dispatch = useDispatch()
  const {quiz} = useSelector((state: any) => state.users)
  let key = location.search.split('?quiz_id=')[1]
  const [count, setCount] = useState<any>(5)
  const [counter, setCounter] = useState(false)
  const [detail, setDetail] = useState<any>()
  const [tab, setTab] = useState('Summary')
  const tabs = ['Summary', 'Players', 'Questions', 'Feedback']
  const classes = useStyles()
  const [completed, setCompleted] = useState<number>(0)
  const [time_taken, setTimeTaken] = useState(0)
  let [didntFinish, setDidntFinish] = useState(0)

  useEffect(() => {
    getSummary(id)
      .then((data: any) => {
        dispatch({type: 'GETQUIZ', payload: data.quiz})
        dispatch({type: 'PIN', payload: data})
        setDetail(data)
        let totalUsers = data.users.length
        let totalQues = data.quiz.questions.length
        let totalQuestions = totalUsers * totalQues
        let totalattempted = data.users
          .map((item: any) => item.results.length)
          .reduce((prev: any, curr: any) => prev + curr, 0)
        setDidntFinish(totalQuestions - totalattempted)
        let totalCorrect = data.users
          .map((item: any) => item.correct_ans)
          .reduce((prev: any, curr: any) => prev + curr, 0)
        let percentage = (totalCorrect / totalattempted) * 100
        percentage = percentage > 100 ? 100 : percentage
        setCompleted(parseInt(percentage.toFixed()))
        let count = 0
        data.users.forEach((x: any) => {
          x.results.forEach((y: any) => {
            if (y.time_taken != null) {
              count += y.time_taken
            }
          })
        })
        setTimeTaken(count)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div
      style={{
        backgroundColor: '#f2f2f2',
        minHeight: 610,
      }}
      className='p-10'
    >
      <div className='row'>
        <div
          className='col-md-8'
          style={{
            display: 'flex',
            height: 180,
            flexDirection: 'column',
          }}
        >
          <h4>Report</h4>
          <h1>{detail?.quiz?.name}</h1>
          <div style={{display: 'flex', flexDirection: 'row', marginTop: '10%'}}>
            {tabs.map((item: any, i: any) => (
              <h4
                key={i}
                style={{
                  marginLeft: i > 0 ? 20 : 0,
                  height: 30,
                  borderBottom: tab == item ? '2px solid #5130A8' : '',
                  color: tab == item ? '#5130A8' : '#00000080',
                  cursor: 'pointer',
                }}
                onClick={() => setTab(item)}
              >
                {item}{' '}
                {item == 'Players'
                  ? `(${detail?.users.length})`
                  : item == 'Questions'
                  ? `(${detail?.quiz?.questions?.length})`
                  : ''}
              </h4>
            ))}
          </div>
        </div>
        <div className='col-md-4' style={{height: 180}}>
          <h4>{detail?.game_mode}</h4>
          <hr style={{width: '80%'}} />
          <h4>{detail?.createdAt.split('T')[0]}</h4>
          <hr style={{width: '80%'}} />
          <h4>Hosted By vishnu</h4>
        </div>
      </div>
      {tab == 'Summary' && (
        <>
          {' '}
          <div className='row' style={{justifyContent: 'space-between'}}>
            <div
              className='col-md-5'
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                height: 200,
                borderRadius: 5,
                justifyContent: 'space-between',
              }}
            >
              <CircularProgress
                className={classes.progress}
                size={120}
                variant='determinate'
                value={completed}
              />
              <div style={{position: 'absolute', marginLeft: 30, marginTop: 10}}>
                <h1>{completed} %</h1>
                <h4>correct</h4>
              </div>
              <div>
                <h1 style={{marginBottom: 20}}>Practice makes perfect!</h1>
                <p>But can it stay this way?</p>
                <button
                  className='btn btn-sm btn-primary'
                  onClick={() => navigate(`/conference-quiz/lobby?quiz_id=${detail.quiz.key}`)}
                >
                  Play Again
                </button>
              </div>
            </div>
            <div
              className='col-md-3 p-10'
              style={{
                backgroundColor: '#fff',
                height: 200,
                borderRadius: 5,
                alignItems: 'center',
                // marginLeft: 20,
                justifyContent: 'space-between',
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4>Players</h4>
                <h4>{detail?.users?.length}</h4>
              </div>
              <hr />
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4>Questions</h4>
                <h4>{detail?.quiz?.questions?.length}</h4>
              </div>
              <hr />
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4>Time</h4>
                <h4>{time_taken}</h4>
              </div>
            </div>
            <div className='col-md-3'>
              <div
                style={{
                  height: 200,
                  // marginLeft: 20,
                }}
              >
                <div
                  style={{
                    backgroundColor: '#271A6C',
                    height: 150,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    borderRadius: 5,
                  }}
                >
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={
                      () => navigate(`/conference-quiz/game-summary?quiz_id=${detail.quiz.key}`)
                      // window.open('http://localhost:3011/conference-quiz/list', '_blank')
                    }
                  >
                    View Podium
                  </button>
                </div>
                <div style={{marginTop: 10}}>
                  Top tip: Boost player engagement by sharing the podium.
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-10' style={{justifyContent: 'space-between'}}>
            <div
              className='col-md-5'
              style={{
                backgroundColor: '#fff',
                height: 200,
                borderRadius: 5,
              }}
            >
              <h5 style={{margin: 10}}>Difficult Questions (0)</h5>
              <hr />
              <p style={{textAlign: 'center'}}>
                Great job! No one found any questions too challenging.
              </p>
            </div>
            <div
              className='col-md-3'
              style={{
                backgroundColor: '#fff',
                height: 200,
                borderRadius: 5,
              }}
            >
              <h5 style={{margin: 10}}>Need Help (0)</h5>
              <hr />
              <div
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  zIndex: 10,
                  height: 130,
                  overflowY: 'scroll',
                }}
              >
                {detail?.users?.map((user: any, i: number) => (
                  <div key={i}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <h4>{user.nickname}</h4>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <CircularProgress
                          size={30}
                          className={classes.progress}
                          variant='determinate'
                          value={0}
                        />
                        <h4 style={{marginLeft: 10}}>0 %</h4>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
            <div
              className='col-md-3'
              style={{
                backgroundColor: '#fff',
                height: 200,
                borderRadius: 5,
              }}
            >
              <h5 style={{margin: 10}}>Didn't finish ({didntFinish})</h5>
              <hr />
              <div
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  zIndex: 10,
                  height: 130,
                  overflowY: 'scroll',
                }}
              >
                {detail?.users?.map((user: any, i: number) => (
                  <div key={i}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <h4>{user.nickname}</h4>
                      <h4>{detail?.quiz?.questions?.length - user?.results?.length}</h4>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>{' '}
        </>
      )}

      {tab == 'Players' && (
        <div className='col-md-12' style={{backgroundColor: '#fff', borderRadius: 5, padding: 10}}>
          <table className='table'>
            <thead>
              <tr>
                <th style={{fontWeight: 'bold'}}>Nickname</th>
                <th style={{fontWeight: 'bold'}}>Rank</th>
                <th style={{fontWeight: 'bold'}}>Correct Answers</th>
                <th style={{fontWeight: 'bold'}}>Unanswered</th>
                <th style={{fontWeight: 'bold'}}>Final Score</th>
              </tr>
            </thead>
            <tbody>
              {detail?.users.map((user: any, i: any) => (
                <tr key={i}>
                  <td>{user.nickname}</td>
                  <td>{i + 1}</td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <CircularProgress
                        size={30}
                        className={classes.progress}
                        variant='determinate'
                        value={parseInt(((user.correct_ans / user.results.length) * 100).toFixed())}
                      />
                      <h4 style={{marginLeft: 10}}>
                        {parseInt(((user.correct_ans / user.results.length) * 100).toFixed())} %
                      </h4>
                    </div>
                  </td>
                  <td>{detail?.quiz?.questions?.length - user?.results?.length}</td>
                  <td>{user?.correct_ans}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab == 'Questions' && (
        <div className='col-md-12' style={{backgroundColor: '#fff', borderRadius: 5, padding: 10}}>
          <table className='table'>
            <thead>
              <tr>
                <th style={{width: '60%', fontWeight: 'bold'}}>Question</th>
                <th style={{fontWeight: 'bold'}}>Type</th>
                <th style={{fontWeight: 'bold'}}>Correct/Incorrect</th>
              </tr>
            </thead>
            <tbody>
              {detail?.quiz.questions.map((question: any, i: number) => (
                <tr key={i}>
                  <td style={{width: '60%'}}>{question.question}</td>
                  <td>{question.question_type}</td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <CircularProgress
                        size={30}
                        className={classes.progress}
                        variant='determinate'
                        value={question.correct}
                      />
                      <h4 style={{marginLeft: 10}}>{question.correct} %</h4>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab == 'Feedback' && (
        <div className='col-md-12 text-center mt-15'>
          <h1>You didn't receive feedback for this kahoot</h1>
          <h6>
            To receive feedback for your next quiz, select 'Get feedback' when it finishes. Players
            will be prompted to rate the game and tell you how the quiz made them feel. They'll also
            be asked if they learned something and if they would recommend this quiz.
          </h6>
        </div>
      )}
    </div>
  )
}

export {Summary}
