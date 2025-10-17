import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import Title from '../component/Title'
import Card from '../component/Card'

function RelatedProduct({category , subCategory , currentProductId}) {

    let {products} = useContext(ShopDataContext)
    let [related ,setRelated] =useState([])

    useEffect(()=>{
        if(products.length > 0){
            let productCopy = products.slice()
            productCopy = productCopy.filter((item) => category === item.category)
             productCopy = productCopy.filter((item) => subCategory === item.subCategory)
              productCopy = productCopy.filter((item) => currentProductId !== item._id)
              setRelated(productCopy.slice(0,4))
        }
    },[products,category,subCategory,currentProductId])
  return (
    <div className='my-[130px] md:my-[40px] md:px-[60px]'>
        <div className='ml-20px] lg:ml-[80px]'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
            {
                related.map((item,index)=>(
                    <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
                
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProduct