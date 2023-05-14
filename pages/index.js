import React from 'react'
import CoursesPage from './courses'
import { getAllCourses } from '@/prisma/courses'

const Home = ({courses}) => {
  return (
    <div>
  <CoursesPage courses={courses}/>
    </div>
  )
}

export default Home

export const getServerSideProps=async()=>{
  const courses= await getAllCourses()

  const updatedCourse=courses.map(course=>(
    {
      ...course,
      createdAt:course.createdAt.toString(),
      updatedAt:course.updatedAt.toString()
    }
  ))

  return{
    props:{
      // courses:JSON.parse(JSON.stringify(courses))
      courses:updatedCourse
    }
  }
}