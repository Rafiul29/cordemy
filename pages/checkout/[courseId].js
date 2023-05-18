import SectionHeader from "@/components/SectionHeader";
import { getSingleCourse } from "@/prisma/courses";
import { currencyConverter } from "@/utlis/currency";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const CheckOut = ({ course }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    courseTitle: course.title,
    price: course.price,
  });

  useEffect(() => {
    if (session) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name,
        email: session.user.email,
      }));
    }
  });

  const handleCheckout=(e)=>{
    e.preventDefault();
    
  }


  return (
    <div className="wrapper py-10 min-h-screen">
      <SectionHeader
        span={"Checkout"}
        h2={"Please provide your details"}
        p={"Fill out this from to contine checkout"}
      />

      <div className="flex justify-center">
        <form onSubmit={handleCheckout}
         className="flex flex-col gap-5 mt-10 w-full lg:w-[35rem]">
          <div className="form-control  flex flex-col gap-2">
            <label htmlFor="name" className="cursor-pointer">
              Name
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="name"
              placeholder="Sarch"
              value={formData.name}
              readOnly
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="cursor-pointer" htmlFor="email">
              Email
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="email"
              id="email"
              placeholder="hello@example.com"
              value={formData.email}
              readOnly
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="cursor-pointer" htmlFor="mobile">
              Phone Number
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="tel"
              id="mobile"
              placeholder="017232XXXXXXX"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="cursor-pointer" htmlFor="address">
              Address
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="address"
              placeholder="Abc  steet ,Ny"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="cursor-pointer" htmlFor="courseTitle">
              Course Title
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="courseTitle"
              placeholder="Advance js course"
              value={formData.courseTitle}
              readOnly
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="cursor-pointer" htmlFor="price">
              Price (USD)
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="number"
              id="price"
              placeholder="$100"
              value={formData.price}
              readOnly
            />
          </div>
          <button
            type="submit"
            role="link"
            className="bg-black rounded-lg text-white py-4 hover:bg-gray-700 duration-300 uppercase"
          >
            Proceed to checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;

export const getServerSideProps = async ({ query }) => {
  const course = await getSingleCourse(query.courseId);
  const updatedCourse = {
    ...course,
    createdAt: course.createdAt.toString(),
    updatedAt: course.updatedAt.toString(),
  };

  return {
    props: {
      course: updatedCourse,
    },
  };
};
