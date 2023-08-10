import { CourseItem } from "@/components/CourseItem";
import SectionHeader from "@/components/SectionHeader";
import { getAllCourses } from "@/prisma/courses";


const CoursesPage = ({courses}) => {


  return (
    <div className="wrapper py-10">
      <SectionHeader
        span="courses"
        h2="Browse all courses"
        p="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea consequatur dicta ipsam exercitationem hic quidem, labore vero repellat eum quae!"
      />
      <div className="mt-10 flex flex-wrap gap-10">{
        courses.map(course=>(
      
          <CourseItem course={course} key={course.id} />
        ))
        }</div>
    </div>
  );
};

export default CoursesPage;


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

