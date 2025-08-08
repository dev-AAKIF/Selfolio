// const asyncHandler={requestHandler}=> {
//     return ((req,res) => {
//         Promise
//         .resolve(requestHandler(req,res,next))
//         .catch()
//     })
// }

const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
         Promise
         .resolve(requestHandler(req,res,next))
         .catch((err)=>next(err))
     }
 }
 
 
 export  default asyncHandler