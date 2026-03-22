import {Route, Routes } from 'react-router-dom'
import Form1 from './pages/form1'
import Form2 from './pages/form2'
import Form3 from './pages/form3'
import Form4 from './pages/form4'


function App() {


  return (
    
     <Routes>
      <Route path="/" element={<Form1 />} />
      <Route path="/form2" element={<Form2 />} />
      <Route path="/form3" element={<Form3 />} />
      <Route path="/form4" element={<Form4 />} />
      
    </Routes>
  )
}

export default App
