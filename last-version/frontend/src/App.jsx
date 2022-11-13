import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AnimatePresence, motion } from 'framer-motion'
import { QueryClientProvider, QueryClient } from 'react-query'

import HomePage from "./pages/HomePage"
import ErrorPage from "./pages/ErrorPage"

import ProductsPage from "./pages/ProductsPage"
import CustomProductPage from "./pages/CustomProductPage"

import LoginPage from "./pages/user/LoginPage"
import ProfilePage from "./pages/user/ProfilePage"

import AdminPage from "./pages/AdminPage"
import ProductsList from "./components/admin/ProductsList"
import NewProduct from "./components/admin/NewProduct"

import ProtectedRoute from "./utils/ProtectedRoute"
import { loadUser } from './redux/user/userActions'
import { useSelector } from 'react-redux'
import store from './store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const trans = { duration: 0.5, ease: "easeInOut" };
const initVariants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1, x: 0, y: 0, transition: trans },
  exit: { opacity: 0, x: 0, y: -100, transition: trans }
};

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <motion.div
          variants={initVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          className="w-full"
        >
          <AnimatePresence>
            <Routes>
              <Route exact path="/" element={ <HomePage/>} />
              <Route exact path="/products" element={ <ProductsPage/> } />
              <Route exact path="/product/:prodId" element={ <CustomProductPage/> } />

              <Route path="/admin" element={<ProtectedRoute><AdminPage/></ProtectedRoute>} />
              <Route path="/admin/products"  element={<ProtectedRoute><ProductsList/></ProtectedRoute>} />
              <Route path="/admin/product/" element={<ProtectedRoute><NewProduct/></ProtectedRoute>} />

              <Route path="/login" element={<LoginPage/>} />
              <Route path="/me" element={<ProfilePage/>} />

              <Route path="*" element={<ErrorPage/>} />
            </Routes>
          </AnimatePresence>
        </motion.div>
      </Router>
    </QueryClientProvider>
  )
}

export default App