import { Route, Routes } from 'react-router-dom'
import Form1 from './pages/form1'
import Form2 from './pages/form2'


function App() {


  return (
    
     <Routes>
      <Route path="/" element={<Form1 />} />
      <Route path="/form2" element={<Form2 />} />
    </Routes>
  )
}

export default App
