import {lazy, FC, Suspense, useEffect} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import MiddleWare from '../pages/middleware/MiddleWare'
import PassagePage from '../pages/passage/PassagePage'

const PrivateRoutes = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../pages/user-management/UsersPage'))
  const PermissionPage = lazy(() => import('../pages/permissions/PermissionPage'))
  const RolesPage = lazy(() => import('../pages/role-management/RolesPage'))
  const StaffPage = lazy(() => import('../pages/staff-management/StaffPage'))
  const SettingPage = lazy(() => import('../pages/settings/SettingPage'))
  const QuestionPage = lazy(() => import('../pages/question-bank/QuestionPage'))
  const Quiz = lazy(() => import('../pages/quiz/QuizPage'))
  const QuizResult = lazy(() => import('../pages/quizResult/QuizPage'))

  const CouponPage = lazy(() => import('../pages/coupons/CouponPage'))
  const PassesPage = lazy(() => import('../pages/passes/PassesPage'))

  const SponsorPage = lazy(() => import('../pages/sponsors/SponsorPage'))
  const SalesPage = lazy(() => import('../pages/sales/SalesPage'))
  const BookPage = lazy(() => import('../pages/books/BookPage'))
  const FeedbackPage = lazy(() => import('../pages/feedback/FeedbackPage'))
  const CoursePage = lazy(() => import('../pages/course-setup/CoursePage'))
  const ConferenceQuizPage = lazy(() => import('../pages/conferenceQuiz/QuizPage'))
  const TemplatePage = lazy(() => import('../pages/quiz-template/TemplatePage'))
 const QuizophyWebsite = lazy(()=>import ("../pages/quizophyWebsite/QuizPage"))
 const UtilitiesPage=lazy(()=>import("../pages/utilities/UtilitiesPage"))
 const PackagesPage=lazy(()=>import("../pages/packages/PackagesPage"))
 const ExamsPage=lazy(()=>import("../pages/exams/ExamsPage"))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<MiddleWare><DashboardWrapper /></MiddleWare>} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <MiddleWare><ProfilePage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <MiddleWare><ProfilePage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
             <MiddleWare><WidgetsPage /></MiddleWare> 
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <MiddleWare><AccountPage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <MiddleWare><ChatPage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='users/*'
          element={
            <SuspensedView>
              <MiddleWare><UsersPage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='permissions'
          element={
            <SuspensedView>
              <MiddleWare><PermissionPage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='roles'
          element={
            <SuspensedView>
             <MiddleWare><RolesPage /></MiddleWare> 
            </SuspensedView>
          }
        />
        <Route
          path='staff/*'
          element={
            <SuspensedView>
             <MiddleWare> <StaffPage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='settings/*'
          element={
            <SuspensedView>
             <MiddleWare><SettingPage /></MiddleWare> 
            </SuspensedView>
          }
        />
        <Route
          path='questions/*'
          element={
            <SuspensedView>
              <MiddleWare><QuestionPage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='coupon/*'
          element={
            <SuspensedView>
             <MiddleWare> <CouponPage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='passes/*'
          element={
            <SuspensedView>
              <MiddleWare><PassesPage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='quiz/*'
          element={
            <SuspensedView>
              <MiddleWare><Quiz /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='/*'
          element={
            <SuspensedView>
              <MiddleWare><QuizResult /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='sponsor/*'
          element={
            <SuspensedView>
              <MiddleWare><SponsorPage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='sales/*'
          element={
            <SuspensedView>
             <MiddleWare><SalesPage /></MiddleWare> 
            </SuspensedView>
          }
        />
        <Route
          path='course/*'
          element={
            <SuspensedView>
             <MiddleWare><CoursePage /></MiddleWare> 
            </SuspensedView>
          }
        />
        <Route
          path='books'
          element={
            <SuspensedView>
              <MiddleWare><BookPage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='feedback'
          element={
            <SuspensedView>
              <MiddleWare> <FeedbackPage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='quiz-template/*'
          element={
            <SuspensedView>
             <MiddleWare> <TemplatePage /></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='conference-quiz/*'
          element={
            <SuspensedView>
              <MiddleWare><ConferenceQuizPage /></MiddleWare>
            </SuspensedView>
          }
        />
         <Route
          path='quizophy-website/*'
          element={
            <SuspensedView>
              <MiddleWare><QuizophyWebsite/></MiddleWare>
            </SuspensedView>
          }
        />
         <Route
          path='utilities/*'
          element={
            <SuspensedView>
              <MiddleWare><UtilitiesPage/></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='passages/*'
          element={
            <SuspensedView>
              <MiddleWare><PassagePage/></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='packages/*'
          element={
            <SuspensedView>
              <MiddleWare><PackagesPage/></MiddleWare>
            </SuspensedView>
          }
        />
        <Route
          path='exams/*'
          element={
            <SuspensedView>
              <MiddleWare><ExamsPage/></MiddleWare>
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export function componentLoader (lazyComponent: any, attemptsLeft: any) {
  return new Promise((resolve, reject) => {
    lazyComponent()
      .then(resolve)
      .catch((error: any) => {
        // let us retry after 1500 ms
        setTimeout(() => {
          if (attemptsLeft === 1) {
            reject(error)
            return
          }
          componentLoader(lazyComponent, attemptsLeft - 1).then(resolve, reject)
        }, 1500)
      })
  })
}

const SuspensedView: FC = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
