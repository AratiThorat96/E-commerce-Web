import React from 'react'

function NewLetterBox(e) {
    const handleSubmit = ()=>{
        e.preventDefault()
    }
  return (
    <div className='w-[99vw] h-[40vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start gap-[10px] flex-col'>
        <p className='md:text-[30px] text-[20px] text-[#a5faf7] font-semibold px-[20px]'> Subscribe now & get 20% off</p>
        <p className='m:text-[18px] text-[14px] text-center text-blue-100 font-semibold px-[20px]'>Subscribe now and enjoy exclusive savings speial deals, and early access to new collections.</p>
        <form action="" onSubmit={handleSubmit} className='w-[100%] h-[30%] md:h-[50%] flex items-center justify-center mt-[20px] gap-[20px] px-[20px]'>
            <input type="text" placeholder='Enter Your Email' className='placeholder:text-[blak] bg-slate-300 w-[600px] max-w-[60%] h-[40px] px-[20px] rounded-lg shadow-sm shadow-black' required/>
            <button className='text-[15px] md:text-16px] px-[10px] md:px-[30px] py-[12px] md:py-[10px] hover:bg-slate-500 cursor-pointer bg-[#2e3030c9] text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] rounded-lg shadow-sm shadow-black'>Subsribe</button>
        </form>
    </div>
  )
}

export default NewLetterBox