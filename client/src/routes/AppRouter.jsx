import { Route, Routes } from 'react-router-dom'
import BeforeRegister from '../component/BeforeRegister'
import Register from '../component/Register'
import Login from '../component/Login'
import TopJobs from '../component/TopJobs'
import MainLayOut from '../component/layout/MainLayOut'
import People from '../component/People'
import Job from '../component/Job'
import GetApp from '../component/GetApp'
import DashBoard from '../component/afterRegisterComponents/DashBoard'
import LayOut from '../component/layout/LayOut'
import JobsApply from '../component/afterRegisterComponents/JobsApply'
import JobDetails from '../component/afterRegisterComponents/JobDetails'
import ApplyForm from '../component/afterRegisterComponents/ApplyForm'
import AppliedJobs from '../component/afterRegisterComponents/AppliedJobs'
import MyProfile from '../component/menuComponent/MyProfile'
import SavedJob from '../component/afterRegisterComponents/SavedJob'
import PostJob from '../component/companyComponents/PostJob'
import MyJobs from '../component/companyComponents/MyJobs'
import Applications from '../component/companyComponents/Applications'
import CompanyDashboard from '../component/companyComponents/CompanyDashboard'
import CandidateProfile from '../component/companyComponents/CandidateProfile'
import Setting from '../component/afterRegisterComponents/Setting'


const AppRouter = () => {
  return (
    <>
      <Routes>

        <Route element={<MainLayOut />}>

          <Route path="/" element={<BeforeRegister />} />
          <Route path='/topjobs' element={<TopJobs />} />
          <Route path='/people' element={<People />} />
          <Route path='/job' element={<Job />} />
          <Route path='/getapp' element={<GetApp />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route element={<LayOut />}>
          <Route path='/jobsapply' element={<JobsApply />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/apply/:id" element={<ApplyForm />} />
          <Route path="/applied" element={<AppliedJobs />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/settings' element={<Setting />} />
          <Route path='/savedjob' element={<SavedJob />} />
          <Route path='/companydashboard' element={<CompanyDashboard />}/>
          <Route path='/candidate-profile/:userId' element={<CandidateProfile />} />
          <Route path='/company/postjob' element={<PostJob />} />
          <Route path='/company/myjobs' element={<MyJobs />} />
          <Route path='/company/applications' element={<Applications />} />

        </Route>
      </Routes>


    </>
  )
}

export default AppRouter