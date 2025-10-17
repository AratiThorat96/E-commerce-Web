import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopDataContext } from '../context/ShopContext'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct'

function ProductDetail() {
  const { productId } = useParams()
  const { products, currency ,addtoCart} = useContext(ShopDataContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = () => {
    const item = products.find((p) => p._id === productId)
    if (item) {
      setProductData(item)
      setImage1(item.image1 || '')
      setImage2(item.image2 || '')
      setImage3(item.image3 || '')
      setImage4(item.image4 || '')
      setImage(item.image1 || '') // default image
    }
  }

  useEffect(() => {
    if (products.length > 0) {
      fetchProductData()
    }
  }, [productId, products])

  if (!productData) {
    return <div className="text-white p-10">Loading product...</div>
  }

  return productData ? (
    <div>
    <div className="lg:w-[99vw] w-[100vw] h-[130vh] md:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-[20px]">
      <div className="lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[50vh] mt-[70px] flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row">
        
        {/* Thumbnail Images */}
        <div className="lg:w-[20%] md:w-[80%] h-[10%] lg:h-[80%] flex items-center justify-center gap-[50px] lg:gap-[20px] lg:flex-col flex-wrap">
          {[image1, image2, image3, image4].map((img, index) => (
            img && (
              <div
                key={index}
                className="md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md overflow-hidden cursor-pointer"
                onClick={() => setImage(img)}
              >
                <img
                  src={img}
                  alt={`product-${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )
          ))}
        </div>

        {/* Main Image */}
        <div className="lg:w-[60%] w-[80%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] rounded-md overflow-hidden">
          <img
            src={image}
            alt={productData.name || 'Product'}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
       
      </div>
       <div className='lg:w-[50vw] w-[100vw] w-[100vw] lg:h-[75vh] h-[40vh] lg:mt-[80px] flex items-start justify-start flex-col py-[20px] px-[30px] md:pb-[20px] md:pl-[20px] lg:pl-[0px] lg:px-[0px] lg:py-[0px] gap-[10px]'>
      <h1 className='text-[40px] font-semibold text-[aliceblue]'>{productData.name.toUpperCase()}</h1>
      <div className='flex items-center gap-1'>
        <FaStar className='text-[20px] fill-[#FFD700]'/>
        <FaStar className='text-[20px] fill-[#FFD700]'/>
        <FaStar className='text-[20px] fill-[#FFD700]'/>
        <FaStar className='text-[20px] fill-[#FFD700]'/>
      <FaStarHalfAlt className='text-[20px] fill-[#FFD700]'/>
      <p className='text-[18px] font-semibold pl-[5px] text-[white]'>(125)</p>
      </div>
      <p className='text-[30px] font-semibold pl-[5px] text-[white]'>{currency} {productData.price}</p>

      <p className='w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white]'>{productData.description} and stylish , breathable cotton shirt with a modern slim fit. Easy to wash , super comfortable,and designed for effortless style.</p>
      <div className='flex flex-col gap-[10px] my-[10px]'>
        <p className='text-[25px] font-semibold pl-[5px] text-[white]'>Select Size</p>
        <div className='flex gap-2'>
          {
            productData.sizes.map((item ,index) =>(
              <button key={index} className={`border py-2 px-4 bg-slate-300 rounded-md ${item === size ? 'bg-[black] text-[#2f97f1] text-[20px]' :''}`} onClick={() => setSize(item)}>{item}</button>
            ))
          }
        </div>
        <button className='text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[10px] px-[20px] rounded-2xl mt-[10px] border-[1px] border-[#80808049] text-white shadow-md shadow-black' onClick={() => addtoCart(productData._id,size)}>Add to Cart</button>
      </div>
      <div className='w-[90%] h-[1px] bg-slate-700'></div>
      <div className='w-[80%] text-[16px] text-white'>
          
            <p>✅ 100% Original Product</p>
            <p>💰 Cash on Delivery Available</p>
            <p>🔁 Easy return within 7 days</p>
          
      </div>
       

        </div>
        
    </div>
    <div className='w-[100%] min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-start flex-col overflow-hidden'>
      <div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px] lg:mt-[0px]'>

        <p className='border px-5 py-3 text-sm text-white'>Description</p>
        
        <p className='border px-5 py-3 text-sm text-white'>Reviews(125)</p>
      </div>
      <div className='w-[80%] md:h-[150px] h-[220px] bg-[#3336397c] border text-white text-[13px] md:text-[15px] lg:teext-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px]'>
        <p className='w-[95%] h-[90%] flex items-center justify-center'>The shirt is meticulously crafted from a premium breathable cotton blend, offering superior comfort and durability. It features a modern slim-fit silhouette that flatters all body types. Perfect for both professional settings and stylish casual outings.</p>
      </div>
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>
    </div>
    </div>

  ) : <div className='opacity-0'></div>
}

export default ProductDetail
