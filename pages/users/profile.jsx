import { getSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {FiLogOut} from 'react-icons/fi'


const Profile = ({session}) => {

  const router=useRouter()

  const logout=async()=>{
      try{
        await signOut('google')
      }catch(err){
        console.log(err.message)
      }
  }

  useEffect(()=>{
    if(!session){
      router.replace("/users/login")
    }
  },[router,session])

  if(!session){
    return null
  }

  return (
    <div className='wrapper py-10 min-h-screen flex flex-col  items-center gap-3'>
      <Image src={session.user.image} alt={session.user.name}
      width={50}
      height={50}
      className='h-20 w-20 rounded-full border-2 border-black'
      />
      <h2 className="text-2xl"> Welcome, {session.user.name}</h2>
      <button onClick={logout}  className="flex gap-2 items-center text-white bg-black py-3 px-6 rounded-lg hover:bg-gray-700 duration-300">
          <span>
            <FiLogOut />
          </span>
          Logout
        </button>
    </div>
  )
}

export default Profile;

export const getServerSideProps=async(context)=>{
  const session=await getSession(context)
  
  if(!session){
    return {
      redirect:{
        destination:"/users/login",
        permanent: false,
      }
    }
  }
  return {
    props:{
      session,
    }
  }

}