import prisma from "./prisma";

//Get All courses
export const getAllCourses=async()=>{
  const courses = await prisma.course.findMany({});

  return courses
}

//Get a single course
export const getSingleCourse=async(id)=>{
  const course= await prisma.course.findUnique({
      where:{id}
    })
 return course
}