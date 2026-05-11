import { useState } from 'react'
import { Button } from 'antd'
import { useTheme } from '@/shared/lib/theme'

const App = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='bg-red-400 dark:bg-green-800'>
        hello world
        <Button onClick={toggleTheme}>Test button</Button>
    </div>
    
  )
}

export default App
