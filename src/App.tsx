import './App.css'
import { Route, Routes } from "react-router-dom"
import HomePage from './components/HomePage'
import ProductCreatePage from './components/products/create/ProductCreatePage'
import RegisterPage from './components/auth/register/register'
import LoginPage from './components/auth/login/login'
import DefaultHeader from './components/containers/default/DefaultHeader'

const App = () => {
  return (
    <>
    <DefaultHeader></DefaultHeader>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage/>} />
          <Route path={"/products/create"} element={<ProductCreatePage/>} />
          <Route path={"register"} element={<RegisterPage/>}/>
          <Route path={"login"} element={<LoginPage/>}/>
        </Route>  
      </Routes>
    </>
  )
}

export default App