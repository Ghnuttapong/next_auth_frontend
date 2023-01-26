import React from 'react'
import Navbar from '../../components/navbar'
import useTokenStore from '../../store/token'

function UserIndex() {
  const token = useTokenStore((state) => state.token);  

  return (
    <div>
        <Navbar />
        <div className="p-5">
          test
        </div>
    </div>
  )
}

export default UserIndex
