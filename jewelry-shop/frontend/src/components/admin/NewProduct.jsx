import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import SideBar from './SideBar'

import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from '../../redux/product/productActions';
import { NEW_PRODUCT_RESET } from '../../redux/product/productConstants';

import { useNavigate } from 'react-router-dom';

const NewProduct = ({ history }) => {
  const notify_success = () => toast.success('Create products success !');
  const notify_error = () => toast.error('Create products failed !');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const categories = [
    "Engagement",
    "Wedding",
    "Earring"
  ]

  const initProduct = {
    name: "",
    price: 0,
    description: "",
    category: categories[0]
  }

  const [productData, setProductData] = useState(initProduct);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [model_3d, setModel3D] = useState("")

  const { loading, error, success } = useSelector((state) => state.newProduct)

  useEffect(() => {
    if (error) {
      notify_error()
      dispatch(clearErrors())
    }

    if (success) {
      notify_success()
      dispatch({ type: NEW_PRODUCT_RESET })

      setTimeout(() => {
        navigate("/admin/products")
      }, 2000)
    }
  }, [dispatch, error, success])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(newProduct({ ...productData, model_3d, images}));
  }

  const onDataChange = (field, data) => {
    setProductData((prevState) => (
      { ...prevState, [field]: data}
    ))
  }

  const onUploadImage = (e) => {
    setImages([])
    setImagesPreview([])
    
    const files = Array.from(e.target.files)
    
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          const imageData = {
            name: file.name,
            data: reader.result
          }
          setImages((oldArray) => [...oldArray, imageData])
          setImagesPreview((oldArray) => [...oldArray, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const onUploadModel = (e) => {
    const files = Array.from(e.target.files)
    
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const modelData = {
          name: file.name,
          data: reader.result
        }
        if (reader.readyState === 2) {
          setModel3D(modelData)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form
              className=""
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <h1 className="mb-4">New Product</h1>

              <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input 
                  type="text" 
                  className="form-control"
                  value={productData.name}
                  onChange={(e) => onDataChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Price</span>
                <input 
                  type="text" 
                  className="form-control"
                  value={productData.price}
                  onChange={(e) => onDataChange('price', e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group mb-3">
                <span className="input-group-text">Description</span>
                <input 
                  type="text" 
                  className="form-control"
                  value={productData.description}
                  onChange={(e) => onDataChange('description', e.target.value)}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Category</span>
                  <select
                    className="form-select"
                    id="category_field"
                    value={productData.category}
                    onChange={(e) => onDataChange('category', e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <input 
                  className="form-control"
                  type="file" 
                  accept="image/*" 
                  name="product_images"
                  multiple
                  onChange={(e) => onUploadImage(e)}
                  required
                />
                <span className="input-group-text">Images</span>
              </div>

              <div className="input-group mb-3">
                <input 
                  className="form-control"
                  type="file" 
                  accept=".glb, .gltf" 
                  name="product_model"
                  onChange={(e) => onUploadModel(e)}
                  required
                />
                <span className="input-group-text">3D Model</span>
              </div>

              <div className='my-3'>
                {imagesPreview.map((img) => (
                  <img
                    src={img}
                    key={img}
                    alt="Images Preview"
                    className="mx-2"
                    width="100"
                    height="100"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="btn btn-primary px-3 py-2"
              >
                Create
              </button>
            </form>
          </div>
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

export default NewProduct