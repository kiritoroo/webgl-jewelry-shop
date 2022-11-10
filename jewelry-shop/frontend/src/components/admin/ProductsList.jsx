import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'
import { getProducts, clearErrors } from "../../redux/product/productActions";

import SideBar from "./SideBar";
import Loading from "../layout/Loading";

const ProductsList = () => {
  const notify_success = () => toast.success('Loading products success !');
  const notify_error = () => toast.error('Loading products failed !');

  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(state => state.products);

  const deleteProductHandler = (id) => {

  }

  const setProducts = () => {
    const data = {
      columns: [
        { label: 'ID', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Price', field: 'price',sort: 'asc' },
        { label: 'Actions', field: 'actions', }, 
      ],
      rows: []
    }
    products.forEach(product => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        actions: <React.Fragment>
          <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2 ms-2">
            <AiFillEdit />
          </Link>
          <button className="btn btn-danger py-1 px-2 ml-2 ms-2" onClick={() => deleteProductHandler(product._id)}>
            <AiFillDelete />
          </button>
        </React.Fragment>
      })
    })
    return data
  }

  useEffect(() => {
    dispatch(getProducts())

    if (error) {
      notify_error()
      dispatch(clearErrors())
    } else {
      notify_success()
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <React.Fragment>
            <h1 className="my-5">All Products</h1>

            {loading ? (
              <Loading />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </React.Fragment>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  )
}

export default ProductsList
