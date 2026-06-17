import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Brand = () => {
  const navigate = useNavigate()
  useEffect(() => { navigate('/catalog') }, [navigate])
  return null
}

export default Brand
