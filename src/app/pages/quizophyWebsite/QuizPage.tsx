import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Faqs from './faqs/Faqs'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import UserMessage from './userMessage/UserMessage'
import Testimonials from './testimonials/Testimonials'
import Features from './features/Features'
import WinnerList from './winnerList/WinnerList'
import Blog from './blog/Blog'
import BlogDetails from './blog/BlogDetails'
import CreateUpdateBlog from './blog/CreateUpdateBlog'
import PathMiddleWare from '../middleware/PathMiddleWare'
import DraftBlog from './draftBlog/DraftBlog'
import { EmplyeeJobAppliedStatus } from './emplyee-job-applied-details/UsersList'
import { QuizophyJobList } from './quizophy-job-list/UsersList'
import CreateUpdateViewJob from './quizophy-job-list/create-update-view-job/CreateUpdateViewJob'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Quizophy Website',
    path: '/quizophy-website',
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
          <Route
            path='user-message'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>User Message</PageTitle>
                 <PathMiddleWare><UserMessage/></PathMiddleWare>
              </>
            }
          />
           <Route
            path='FAQs'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>FAQs</PageTitle>
                <PathMiddleWare><Faqs/></PathMiddleWare>
              </>
            }
          />
           <Route
            path='testimonials'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Testimonials</PageTitle>
                <PathMiddleWare><Testimonials/></PathMiddleWare>
              </>
            }
          />
             <Route
            path='features'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Features</PageTitle>
                <PathMiddleWare><Features/></PathMiddleWare>
              </>
            }
          />
          <Route
            path='winner-list'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Winner List</PageTitle>
                <PathMiddleWare><WinnerList/></PathMiddleWare>
              </>
            }
          />
           <Route
            path='blog'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Blog</PageTitle>
                <PathMiddleWare><Blog/></PathMiddleWare>
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
            path='job-applied-status'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Job Status</PageTitle>
                <EmplyeeJobAppliedStatus/>
              </>
            }
          />
          <Route
            path='job-list'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Job List</PageTitle>
                <QuizophyJobList/>
              </>
            }
          />
          <Route
            path='create-new-job'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create Job</PageTitle>
                <CreateUpdateViewJob/>
              </>
            }
          />
          <Route
            path='edit-job/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Job</PageTitle>
                <CreateUpdateViewJob/>
              </>
            }
          />
          <Route index element={<Navigate to='/quizophy-website/user-message' />} />
        </Route>
      </Routes>
    </>
  )
}

export default BookPage