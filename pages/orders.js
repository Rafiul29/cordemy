import Button from "@/components/Button";
import prisma from "@/prisma/prisma";
import { currencyConverter } from "@/utlis/currency";
import { getSession, } from "next-auth/react"

import { useRouter } from "next/router";
import { useEffect } from "react";


const OrderPages = ({session,customer}) => {

  const router=useRouter();

  useEffect(()=>{
    if(!session){
      router.replace("/users/login")
    } 
  },[router,session])

  return (
    <div className="wrapper py-10 min-h-screen">
    <h2 className="text-3xl ">You enrolled : {customer.orders.length} course{customer.orders.length >1 ? "s":""}</h2>


    <div className="courses flex flex-wrap gap-10">
      {
      customer.orders.map((course)=>(
        <div className="course p-5 shadow-md rounded-lg space-y-3" key={course.id}>
          <h2 className="text-2xl">{course.courseTitle}</h2>
          <p className="">Amount :{currencyConverter(course.amountTotal)}</p>
          <Button href={'/users/dashboard/course/${course.courseId}'} placeholder={"Study now"}/>
        </div>
      ))
      }
    </div>
    </div>
  )
}

export default OrderPages;

export const getServerSideProps=async(context)=>{
  const session=await getSession(context)
  const customer=await prisma.user.findUnique({
    where:{
      email:session?.user?.email,
    },
    include:{
      orders:true,
    }
  })


  if(!session || !customer){
    return {
      redirect:{
        destination:'/users/login',
        permanent:true
      }
    }
  }

const updatedCustomers={
  ...customer,
  updatedAt:customer.updatedAt.toString(),
  createdAt:customer.createdAt.toString(),

  orders:customer.orders.map((order)=>({
    ...order,
    updatedAt:customer.updatedAt.toString(),
    createdAt:customer.createdAt.toString(),
  
  }))
}


  
  return{
    props:{
      session,
      customer:updatedCustomers
    }
  }
}