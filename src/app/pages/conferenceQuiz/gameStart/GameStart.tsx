import {FC, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import openSocket from 'socket.io-client'
import clsx from 'clsx'
import {useDispatch, useSelector} from 'react-redux'
import {shareIndex, showRank, timesUp} from '../quizList/core/_requests'

const GameStart: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location: any = useLocation()
  const {quiz, user_ans, users} = useSelector((state: any) => state.users)
  let key = location.search.split('?quiz_id=')[1]
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState<any>(3)
  const [counter, setCounter] = useState(false)
  const [quesTimer, setQuesTimer] = useState<any>()
  const [timeUp, setTimeup] = useState(false)
  const [scoreBoard, setScoreBoard] = useState(false)
  const apiUrl = 'https://api.testerika.com'
  const socket = openSocket(apiUrl, {transports: ['websocket'], secure: true})

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
    if (
      user_ans.filter((x: any) => x.question_id == quiz.questions[index].id).length == users.length
    ) {
      setTimeup(true)
    }
  }, [user_ans])

  useEffect(() => {
    window.onbeforeunload = (event) => {
      debugger
      const e = event || window.event
      // Cancel the event
      e.preventDefault()
      if (e) {
        e.returnValue = '' // Legacy method for cross browser support
      }
      return '' // Legacy method for cross browser support
    }
  }, [])

  useEffect(() => {
    if (quesTimer == 0) {
      timesUp().then((data: any) => {
        if (data == 'success') {
          setTimeup(true)
        }
      })
    }
    let timer: any =
      quesTimer > 0 && !timeUp && setInterval(() => setQuesTimer(quesTimer - 1), 1000)
    return () => clearInterval(timer)
  }, [quesTimer])

  useEffect(() => {
    getSocketData()
    setTimeout(() => {
      setCounter(true)
    }, 3000)

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (count == 0) {
      setCounter(false)
      let time = parseInt(quiz.questions[index].time_limit.split(' ')[0])
      setQuesTimer(time)
    }
    let timer: any = count > 0 && counter && setInterval(() => setCount(count - 1), 1000)
    return () => clearInterval(timer)
  }, [count, counter])

  const getSocketData = async () => {
    socket.on('user_ans', (data) => {
      dispatch({type: 'USERANS', payload: data})
    })
  }

  const changeQues = async () => {
    if (!scoreBoard && !timeUp) {
      timesUp().then((data: any) => {
        if (data == 'success') {
          setTimeup(true)
        }
      })
    } else if (!scoreBoard && timeUp && !(index == quiz.questions.length - 1)) {
      setScoreBoard(true)
    } else {
      if (index == quiz.questions.length - 1) {
        showRank()
          .then((data: any) => {
            if (data == 'success') {
              navigate(`/conference-quiz/game-over${location.search}`, {
                state: {data: quiz},
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        shareIndex(index + 1)
          .then((data: any) => {
            if (data == 'success') {
              setIndex(index + 1)
              setScoreBoard(false)
              setCount(5)
              setCounter(true)
              setTimeup(false)
              let time = parseInt(quiz.questions[index].time_limit.split(' ')[0])
              setQuesTimer(time)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  return (
    <div
      className=''
      style={{
        backgroundColor:
          count == 0 && !counter && !scoreBoard ? '#F2F2F2' : scoreBoard ? '#472890' : '#66BF39',
        minHeight: 610,
        display: 'flex',
        justifyContent: 'center',
        alignItems: count == 0 && !counter ? 'flex-start' : 'center',
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
            width: '100%',
            height: 100,
            borderRadius: 5,
            fontWeight: 'bolder',
            fontSize: 30,
          }}
        >
          {quiz?.questions[index]?.question}
        </div>
      ) : count == 0 && !counter ? (
        <div style={{width: '100%'}}>
          <div
            className='mt-5'
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div></div>
            <div
              className='shadow'
              style={{
                display: 'flex',
                height: 80,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                fontWeight: 'bolder',
                padding: 30,
              }}
            >
              {scoreBoard ? 'Scoreboard' : quiz.questions[index].question}
            </div>
            <button className='btn btn-lg btn-primary' onClick={() => changeQues()} type='button'>
              {!scoreBoard && !timeUp ? 'Skip' : 'Next'}
            </button>
          </div>
          {!timeUp && !scoreBoard ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <div
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 200,
                  backgroundColor: '#472890',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  color: '#fff',
                  fontSize: 30,
                  marginLeft: 20,
                }}
              >
                {quesTimer}
              </div>

              <div className='mt-10 bg-white mx-auto shadow' style={{height: 300, width: '40%'}}>
                <img src={quiz?.questions[index].image} style={{height: 300, width: '40%'}} />
              </div>
              <div
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 200,
                  backgroundColor: '#472890',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  color: '#fff',
                  fontSize: 30,
                  marginLeft: 20,
                }}
              >
                {user_ans.filter((x: any) => x.question_id == quiz.questions[index].id).length}
              </div>
            </div>
          ) : scoreBoard ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '15%',
                alignSelf: 'center',
              }}
            >
              {users.map((user: any, i: any) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#fff',
                    height: 40,
                    width: '90%',
                    padding: 15,
                    fontSize: 20,
                    fontWeight: 'bolder',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}
                >
                  <span>{user?.nickname}</span>
                  <span>1</span>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 300,
              }}
            >
              {quiz.questions[index].question_type == 'Quiz' &&
                quiz.questions[index].options.map((item: any, i: any) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        i == 0
                          ? '#AF282F'
                          : i == 1
                          ? '#0F51A0'
                          : i == 2
                          ? '#A77B2B'
                          : i == 3
                          ? '#2E6A16'
                          : i == 4
                          ? '#3F9797'
                          : '#7C46B0',
                      height: 40,
                      width: '10%',
                      color: '#fff',
                      fontWeight: 'bolder',
                      fontSize: 18,
                      marginLeft: 10,
                    }}
                  >
                    {
                      user_ans
                        .filter((x: any) => x.question_id == quiz.questions[index].id)
                        .filter((x: any) => x.user_ans == i).length
                    }
                  </div>
                ))}

              {quiz.questions[index].question_type == 'True or false' &&
                quiz.questions[index].options.map((item: any, i: any) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: i == 0 ? '#0F51A0' : '#AF282F',
                      height: 40,
                      width: '10%',
                      color: '#fff',
                      fontWeight: 'bolder',
                      fontSize: 18,
                      marginLeft: 10,
                    }}
                  >
                    {
                      user_ans
                        .filter((x: any) => x.question_id == quiz.questions[index].id)
                        .filter((x: any) => x.user_ans == i).length
                    }
                  </div>
                ))}
            </div>
          )}
          {!scoreBoard && (
            <>
              {' '}
              <div className='row mt-5 mx-auto'>
                {quiz.questions[index].question_type == 'Quiz' &&
                  quiz.questions[index]?.options.map((item: any, i: any) => (
                    <div
                      key={i}
                      className='mx-auto row shadow col-md-6 mt-5'
                      style={{
                        height: 90,
                        width: '49%',
                        backgroundColor:
                          i == 0
                            ? '#AF282F'
                            : i == 1
                            ? '#0F51A0'
                            : i == 2
                            ? '#A77B2B'
                            : i == 3
                            ? '#2E6A16'
                            : i == 4
                            ? '#3F9797'
                            : '#7C46B0',
                      }}
                    >
                      <div
                        className='col-md-10'
                        style={{fontSize: 20, color: '#fff', fontWeight: 'bolder', paddingTop: 25}}
                      >
                        {item?.options || ''}
                      </div>
                      {timeUp && (
                        <div className='col-md-2'>
                          <input
                            name='right_option'
                            type={'radio'}
                            checked={item?.right_option == true}
                            onChange={() => console.log('clicked')}
                            id={`right_option0`}
                            className={clsx('form-check-input mt-10')}
                            autoComplete='off'
                          />
                        </div>
                      )}
                    </div>
                  ))}
                {quiz.questions[index].question_type == 'True or false' &&
                  quiz.questions[index]?.options.map((item: any, i: any) => (
                    <div
                      key={i}
                      className='mx-auto row shadow col-md-6 mt-5'
                      style={{
                        height: 90,
                        width: '49%',
                        backgroundColor: i == 0 ? '#0F51A0' : '#AF282F',
                      }}
                    >
                      <div
                        className='col-md-10'
                        style={{fontSize: 20, color: '#fff', fontWeight: 'bolder', paddingTop: 25}}
                      >
                        {item?.options || ''}
                      </div>
                      {timeUp && (
                        <div className='col-md-2'>
                          <input
                            name='right_option'
                            type={'radio'}
                            checked={item?.right_option == true}
                            onChange={() => console.log('clicked')}
                            id={`right_option0`}
                            className={clsx('form-check-input mt-10')}
                            autoComplete='off'
                          />
                        </div>
                      )}
                    </div>
                  ))}
                {/* <div
                  className='mx-auto row shadow'
                  style={{height: 90, width: '49%', backgroundColor: '#0F51A0'}}
                >
                  <div
                    className='col-md-10'
                    style={{fontSize: 20, color: '#fff', fontWeight: 'bolder', paddingTop: 25}}
                  >
                    {quiz.questions[index]?.options[1]?.options || ''}
                  </div>
                  {timeUp && (
                    <div className='col-md-2'>
                      <input
                        name='right_option'
                        type={'radio'}
                        checked={quiz?.questions[index]?.options[1]?.right_option == true}
                        id={`right_option1`}
                        onChange={() => console.log('clicked')}
                        className={clsx('form-check-input mt-10')}
                        autoComplete='off'
                      />
                    </div>
                  )}
                </div> */}
              </div>
              {/* <div className='row mt-5 mx-auto mb-5'>
                <div
                  className='mx-auto row shadow'
                  style={{height: 90, width: '49%', backgroundColor: '#A77B2B'}}
                >
                  <div
                    className='col-md-10'
                    style={{fontSize: 20, color: '#fff', fontWeight: 'bolder', paddingTop: 25}}
                  >
                    {quiz.questions[index]?.options[2]?.options || ''}
                  </div>
                  {timeUp && (
                    <div className='col-md-2'>
                      <input
                        name='right_option'
                        type={'radio'}
                        onChange={() => console.log('clicked')}
                        checked={quiz.questions[index]?.options[2]?.right_option == true}
                        id={`right_option2`}
                        className={clsx('form-check-input mt-10')}
                        autoComplete='off'
                      />
                    </div>
                  )}
                </div>
                <div
                  className='mx-auto row shadow'
                  style={{height: 90, width: '49%', backgroundColor: '#2E6A16'}}
                >
                  <div
                    className='col-md-10'
                    style={{fontSize: 20, color: '#fff', fontWeight: 'bolder', paddingTop: 25}}
                  >
                    {quiz.questions[index]?.options[3]?.options || ''}
                  </div>
                  {timeUp && (
                    <div className='col-md-2'>
                      <input
                        name='right_option'
                        type={'radio'}
                        onChange={() => console.log('clicked')}
                        checked={quiz?.questions[index]?.options[3]?.right_option == true}
                        id={`right_option3`}
                        className={clsx('form-check-input mt-10')}
                        autoComplete='off'
                      />
                    </div>
                  )}
                </div>
              </div> */}
            </>
          )}
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
          QUIZ
        </div>
      )}
    </div>
  )
}

export {GameStart}

