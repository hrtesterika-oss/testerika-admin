import {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {createPin, getUserById} from '../quizList/core/_requests'

const Select: FC = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const location = useLocation()
  const {quiz} = useSelector((state: any) => state.users)
  const navigate = useNavigate()
  // const [quiz, setQuiz] = useState<any>()
  const [device, setDevice] = useState('personal')
  const [teamMode, setMode] = useState(false)

  useEffect(() => {
    getUserById(id)
      .then((data: any) => {
        dispatch({type: 'GETQUIZ', payload: data})
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const generatePin = (mode: string) => {
    const payload = {
      game_mode: mode,
      quiz_id: quiz.id,
    }
    createPin(payload)
      .then((data: any) => {
        dispatch({type: 'PIN', payload: data})
        navigate(`/conference-quiz/lobby?quiz_id=${id}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='p-5' style={{backgroundColor: '#472890', height: 610}}>
      <div
        className='text-center bg-white mx-auto'
        style={{
          width: 200,
          height: 40,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <h3 className='pt-4'>{quiz?.name}</h3>
      </div>
      <div
        className='text-center mx-auto'
        style={{
          width: 200,
          height: 30,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: '#864CBF',
        }}
      >
        <p className='pt-2' style={{color: 'white', fontWeight: 'bold'}}>
          Choose a mode for this quiz
        </p>
      </div>
      {!teamMode ? (
        <div className='row mt-10' style={{alignItems: 'center', justifyContent: 'center'}}>
          <div
            className='col-md-5 bg-white me-5 p-5'
            style={{height: 300, borderRadius: 10, cursor: 'pointer'}}
            onClick={() => {
              generatePin('classic')
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2>Classic mode</h2>
              <h6 style={{color: '#1368CE'}}>Start</h6>
            </div>
          </div>
          <div
            className='col-md-5 bg-white p-5'
            style={{height: 300, borderRadius: 10, cursor: 'pointer'}}
            onClick={() => {
              setMode(true)
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2>Team Mode</h2>
              <span className='svg-icon svg-icon-primary svg-icon-2x'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  width='24px'
                  height='24px'
                  viewBox='0 0 24 24'
                  version='1.1'
                >
                  <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                    <polygon points='0 0 24 0 24 24 0 24' />
                    <path
                      d='M6.70710678,15.7071068 C6.31658249,16.0976311 5.68341751,16.0976311 5.29289322,15.7071068 C4.90236893,15.3165825 4.90236893,14.6834175 5.29289322,14.2928932 L11.2928932,8.29289322 C11.6714722,7.91431428 12.2810586,7.90106866 12.6757246,8.26284586 L18.6757246,13.7628459 C19.0828436,14.1360383 19.1103465,14.7686056 18.7371541,15.1757246 C18.3639617,15.5828436 17.7313944,15.6103465 17.3242754,15.2371541 L12.0300757,10.3841378 L6.70710678,15.7071068 Z'
                      fill='#000000'
                      fillRule='nonzero'
                      transform='translate(12.000003, 11.999999) rotate(-270.000000) translate(-12.000003, -11.999999) '
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className='mt-10 mx-auto'
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            alignSelf: 'center',
          }}
        >
          <div className='bg-white p-5' style={{height: 380, borderRadius: 10}}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setMode(false)}
            >
              <span className='svg-icon svg-icon-primary svg-icon-2x'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  width='24px'
                  height='24px'
                  viewBox='0 0 24 24'
                  version='1.1'
                >
                  <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                    <polygon points='0 0 24 0 24 24 0 24' />
                    <path
                      d='M6.70710678,15.7071068 C6.31658249,16.0976311 5.68341751,16.0976311 5.29289322,15.7071068 C4.90236893,15.3165825 4.90236893,14.6834175 5.29289322,14.2928932 L11.2928932,8.29289322 C11.6714722,7.91431428 12.2810586,7.90106866 12.6757246,8.26284586 L18.6757246,13.7628459 C19.0828436,14.1360383 19.1103465,14.7686056 18.7371541,15.1757246 C18.3639617,15.5828436 17.7313944,15.6103465 17.3242754,15.2371541 L12.0300757,10.3841378 L6.70710678,15.7071068 Z'
                      fill='#000000'
                      fillRule='nonzero'
                      transform='translate(12.000003, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-12.000003, -11.999999) '
                    />
                  </g>
                </svg>
              </span>
              <h6 className='text-muted mt-2 ml-2'>Back</h6>
            </div>
            <div className='m-10'>
              <h1>Team Mode</h1>
              <p style={{width: '50%'}}>
                Boost collaboration, teamwork, and communication with team mode. Players work
                together on teams to compete for a top spot on the podium.
              </p>
              <div
                className='border border-right border-secondary'
                style={{height: 100, width: 300, cursor: 'pointer'}}
              >
                <div
                  className='p-5'
                  style={{
                    height: 50,
                    backgroundColor: device == 'personal' ? '#E6EFF9' : '#fff',
                    width: 300,
                  }}
                  onClick={() => setDevice('personal')}
                >
                  <h6>Teams on personal devices</h6>
                </div>
                <div
                  className='p-5'
                  style={{
                    height: 50,
                    backgroundColor: device == 'shared' ? '#E6EFF9' : '#fff',
                    width: 300,
                  }}
                  onClick={() => setDevice('shared')}
                >
                  <h6>Teams on shared devices</h6>
                </div>
              </div>
              <button
                className='btn btn-sm btn-primary mt-5'
                type='button'
                onClick={() => {
                  generatePin('team')
                }}
                style={{marginLeft: '15%'}}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export {Select}
