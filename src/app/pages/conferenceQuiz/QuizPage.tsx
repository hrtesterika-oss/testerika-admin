import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Create} from './createQuiz/Create'
import {CreateQuiz} from './createQuiz/CreateQuiz'
import {EditPage} from './editQuiz/EditPage'
import {GameSummaryPage} from './game-summary/GameSummaryPage'
import {GamePage} from './game/GamePage'
import {GameOverPage} from './gameover/GameOverPage'
import {GameStartPage} from './gameStart/GameStartPage'
import {LobbyPage} from './lobby/LobbyPage'
import CreateNewPlan from './podiumPlanList/createNewPlan/CreateNewPlan'
import {ReportsPage} from './reports/UsersList'
import {SelectMode} from './selectMode/SelectMode'
import {SummaryPage} from './summary/SummaryPage'
import CreateUser from './userList/createUser/CreateUser'
import PlanList from './podiumPlanList/viewPlanList/PlanList'
import TemplateList from './template/viewTemplate/TemplateList'
import CreateTemplate from './template/createTemplate/CreateTemplate'
import EditTemplate from './template/editTemplate/EditTemplate'
import OneTimeSetting from './oneTimeSetting/OneTimeSetting'
import OneTimeMoreInfo from './oneTimeSetting/oneTimeMoreInfo/OneTimeMoreInfo'
import CreateUpdateTransaction from './transactionHistory/createUpdateTransaction/CreateUpdateTransaction'
import { PermissionsListWrapper } from '../permissions/users-list/PermissionList'
import { UsersListWrapper } from '../user-management/users-list/UsersList'
import FAQs from './podiumFAQs/FAQs'
import Testimonial from './testimonials/Testimonial'
import PodiumFeatures from './podiumWorking/PodiumFeatures'
import PathMiddleWare from '../middleware/PathMiddleWare'
import Blog from './blog/Blog'
import BlogDetails from './blog/BlogDetails'
import CreateUpdateBlog from './blog/CreateUpdateBlog'
import DraftBlog from './draftBlog/DraftBlog'
import Coupons from './coupons/Coupons'
import CreateUpdateCoupon from './coupons/CreateUpdateCoupon'
import { QuestionListWrapper } from './userList/quizList/QuizList'
import ViewQuizDetail from './userList/viewQuiz/ViewQuizDetail'
import { QuestionListWrapperReport } from './userList/quizReport/QuizList'
import  Summary  from  "./userList/summary/Summary"
import { TransactionHistoryWrapper } from './userList/userTransaction/QuizList'
import { PollListWrapper } from './userList/userPoll/QuizList'
import Poll from './userList/userPoll/createPoll/Poll'
import ViewPoll from './userList/userPoll/createPoll/ViewPoll'
import EditPoll from './userList/userPoll/createPoll/EditPoll'
import PollResult from './userList/userPoll/createPoll/PollResult'
import { QuizzesListWrapper } from './quizzes/quizList/QuizList'
import { PollsWrapper } from './polls/pollList/QuizList'
import { UserListWrapper } from './userList/usersList/QuizList'
import { PasswordHistory } from './passwordHistory/QuizList'
import { CompanyUserListWrapper } from './userList/companyUser/QuizList'
const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Conference Quiz',
    path: '/conference-quiz/user',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const BookPage = () => {
  return (
    <>
      <Routes>
        <Route element={<Outlet />}>
          {/* <Route
            path='list'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Conference Quiz list</PageTitle>
                <UsersListWrapper />
              </>
            }
          />
          <Route
            path='create'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create a Conference Quiz</PageTitle>
                <CreateQuiz />
              </>
            }
          />
          <Route
            path=':id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Select Quiz Mode</PageTitle>
                <SelectMode />
              </>
            }
          /> */}

          <Route
            path='user'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>User List</PageTitle>
                <PathMiddleWare><UserListWrapper /></PathMiddleWare>
                {/* <UserListWrapper/> */}
                {/* <UsersListWrapper/> */}
              </>
            }
          />

          <Route
            path='company-user/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Company User</PageTitle>
                <CompanyUserListWrapper />
                {/* <UserListWrapper/> */}
                {/* <UsersListWrapper/> */}
              </>
            }
          />

          <Route
            path='quizzes/list/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Quizzes</PageTitle>
                <QuestionListWrapper />
                {/* <UsersListWrapper/> */}
              </>
            }
          />
           <Route
            path='quizzes/:id/:quiz_id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Quiz Detail</PageTitle>
                <ViewQuizDetail />
                {/* <UsersListWrapper/> */}
              </>
            }
          />
          <Route
            path='quiz/report/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Quiz Report</PageTitle>
                <QuestionListWrapperReport />
                {/* <UsersListWrapper/> */}
              </>
            }
          />
           <Route
            path='report/summary/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>PIN Summary</PageTitle>
                <Summary />
                {/* <UsersListWrapper/> */}
              </>
            }
          />
           <Route
            path='transaction-history'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Transactions</PageTitle>
                <TransactionHistoryWrapper />
                {/* <UsersListWrapper/> */}
              </>
            }
          />
          <Route
            path='user/create-new-user'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create New User</PageTitle>
                <CreateUser />
              </>
            }
          />
          <Route
            path='blog'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Podium Blog</PageTitle>
               <PathMiddleWare><Blog /></PathMiddleWare> 
              </>
            }
          />
            <Route
            path='blog/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Blog Details</PageTitle>
                <BlogDetails/>
              </>
            }
          />
           <Route
            path='blog/create'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create Blog</PageTitle>
                <CreateUpdateBlog/>
              </>
            }
          />
           <Route
            path='blog/edit/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Blog</PageTitle>
                <CreateUpdateBlog/>
              </>
            }
          />
          <Route
            path='blog/draft'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Draft Blogs</PageTitle>
                <DraftBlog/>
              </>
            }
          />


           <Route
            path='COUPONS'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Podium Coupons</PageTitle>
               <PathMiddleWare><Coupons /></PathMiddleWare> 
              </>
            }
          />
           <Route
            path='COUPONS/create'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create Coupon</PageTitle>
                <CreateUpdateCoupon/>
              </>
            }
          />
           <Route
            path='COUPONS/edit/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Coupon</PageTitle>
                <CreateUpdateCoupon/>
              </>
            }
          />
          <Route
            path='podium/plan-list'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Podium Plan list</PageTitle>
                <PathMiddleWare><PlanList/></PathMiddleWare>
              </>
            }
          />
          <Route
            path='podium/create-new-plan'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create New Plan</PageTitle>
                <CreateNewPlan />
              </>
            }
          />
           <Route
            path='podium/update-plan/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Update Plan</PageTitle>
                <CreateNewPlan />
              </>
            }
          />
           
          <Route
            path='podium/create-new-transaction'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create License</PageTitle>
                <CreateUpdateTransaction />
              </>
            }
          />
           <Route
            path='podium/update-transaction/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Update Transaction</PageTitle>
                <CreateUpdateTransaction />
              </>
            }
          />
          <Route
            path='polls/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Polls</PageTitle>
                <PollListWrapper />
              </>
            }
          />
           <Route
            path='polls/create/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Add Poll</PageTitle>
                <Poll />
              </>
            }
          />
           <Route
            path='polls/edit/:id/:poll_id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Poll</PageTitle>
                <EditPoll />
              </>
            }
          />
           <Route
            path='polls/view/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>View Poll</PageTitle>
                <ViewPoll />
              </>
            }
          />
          <Route
            path='poll/result/:key'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Poll Result</PageTitle>
                <PollResult />
              </>
            }
          />
           <Route
            path='quizzes'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Quizzes</PageTitle>
                <PathMiddleWare><QuizzesListWrapper /></PathMiddleWare>
              </>
            }
          />
           <Route
            path='polls'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Polls</PageTitle>
                <PathMiddleWare><PollsWrapper /></PathMiddleWare>
              </>
            }
          />
          
          <Route
            path='podium/template'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Template</PageTitle>
                <PathMiddleWare><TemplateList /></PathMiddleWare>
              </>
            }
          />
          <Route
            path='podium/create-new-template'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create New Template</PageTitle>
                <CreateTemplate />
              </>
            }
          />
          <Route
            path='podium/edit-template/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Template</PageTitle>
                <EditTemplate />
              </>
            }
          />
           <Route
            path='podium/one-time/setting'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>One Time Setting</PageTitle>
               <PathMiddleWare><OneTimeSetting /></PathMiddleWare> 
              </>
            }
          />
           <Route
            path='podium/one-time/moreInfo/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>One Time Info</PageTitle>
                <OneTimeMoreInfo />
              </>
            }
          />
          <Route
            path='podium/FAQs'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Podium FAQs</PageTitle>
                <PathMiddleWare><FAQs /></PathMiddleWare>
              </>
            }
          />
           <Route
            path='podium/testimonials'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Podium Testimonials</PageTitle>
              <PathMiddleWare> <Testimonial /></PathMiddleWare> 
              </>
            }
          />
          <Route
            path='podium/working'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Podium Working</PageTitle>
               <PathMiddleWare><PodiumFeatures /></PathMiddleWare> 
              </>
            }
          />
          <Route
            path='password-history'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Password History</PageTitle>
                <PasswordHistory />
                {/* <UsersListWrapper/> */}
              </>
            }
          />
          {/* <Route
            path='lobby'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Quiz Lobby</PageTitle>
                <LobbyPage />
              </>
            }
          />
          <Route
            path='game'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Game Loading</PageTitle>
                <GamePage />
              </>
            }
          />
          <Route
            path='game-start'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Game Start</PageTitle>
                <GameStartPage />
              </>
            }
          />
          <Route
            path='game-over'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Game Over</PageTitle>
                <GameOverPage />
              </>
            }
          />
          <Route
            path='game-summary'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Game Over</PageTitle>
                <GameSummaryPage />
              </>
            }
          />
          <Route
            path='reports/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Reports Page</PageTitle>
                <ReportsPage />
              </>
            }
          />
          <Route
            path='summary/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Summary Page</PageTitle>
                <SummaryPage />
              </>
            }
          />
          <Route
            path='edit/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Page</PageTitle>
                <EditPage />
              </>
            }
          /> */}
          <Route index element={<Navigate to='/conference-quiz/list' />} />
        </Route>
      </Routes>
    </>
  )
}

export default BookPage
