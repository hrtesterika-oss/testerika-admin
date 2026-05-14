import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {General} from './components/General'
import {CompanyInfo} from './components/CompanyInfo'
import {Localization} from './components/Localization'
import {Finance} from './components/Finance'
import {PaymentGateway} from './components/PaymentGateway'
import {Customers} from './components/Customers'
import {Pdf} from './components/Pdf'
import {Sms} from './components/Sms'
import {Cronjob} from './components/CronJob'
import {Misc} from './components/Misc'
import {CashBonus} from './components/CashBonus'
import {WalletMinBalance} from './components/WalletMinBalance'
import {AppCurVersion} from './components/AppCurVersion'
import {Spinwin} from './components/Spinwin'
import {Email} from './components/Email'
import QuizophyAwsSetting from './components/QuizophyAwsSetting'
import PathMiddleWare from '../middleware/PathMiddleWare'
import AsideMenuStatus from './components/AsideMenuStatus'

const chatBreadCrumbs: Array<PageLink> = [
  {
    title: 'Settings',
    path: '/settings/general',
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

const SettingPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='general'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>General Setting</PageTitle>
              <PathMiddleWare><General /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='company-information'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Company Information Setting</PageTitle>
              <PathMiddleWare><CompanyInfo /></PathMiddleWare>
            </>
          }
        />
         <Route
          path='quizophy-AWS-settings'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Quizophy AWS Settings</PageTitle>
             <PathMiddleWare> <QuizophyAwsSetting /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='localization'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Localization Setting</PageTitle>
             <PathMiddleWare> <Localization /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='finance'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Finance Setting</PageTitle>
              <PathMiddleWare><Finance /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='payment-gateways'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Payment Gateway Setting</PageTitle>
              <PathMiddleWare><PaymentGateway /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='customers'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Customer Setting</PageTitle>
             <PathMiddleWare> <Customers /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='PDF'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>PDF Setting</PageTitle>
              <PathMiddleWare><Pdf /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='SMS'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>SMS Setting</PageTitle>
              <PathMiddleWare><Sms /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='cron-jobs'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Cron job Setting</PageTitle>
              <PathMiddleWare><Cronjob /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='misc'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Misc Setting</PageTitle>
             <PathMiddleWare><Misc /></PathMiddleWare> 
            </>
          }
        />
        <Route
          path='cash-bonus'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Cash Bonus Setting</PageTitle>
              <PathMiddleWare><CashBonus /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='wallet-minimun-balance'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Wallet minimun balance Setting</PageTitle>
             <PathMiddleWare><WalletMinBalance /></PathMiddleWare> 
            </>
          }
        />
        <Route
          path='app-current-version'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>App current version Setting</PageTitle>
             <PathMiddleWare><AppCurVersion /></PathMiddleWare> 
            </>
          }
        />
        <Route
          path='spin-the-wheel'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Spinwin Setting</PageTitle>
             <PathMiddleWare><Spinwin /></PathMiddleWare> 
            </>
          }
        />
        <Route
          path='email'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Email Setting</PageTitle>
             <PathMiddleWare> <Email /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='aside-menu-status'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Aside Menu Status</PageTitle>
              <PathMiddleWare><AsideMenuStatus /></PathMiddleWare>
            </>
          }
        />
        <Route index element={<Navigate to='/settings/general' />} />
      </Route>
    </Routes>
  )
}

export default SettingPage
