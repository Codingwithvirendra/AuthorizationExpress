export const checkLogin = (req,res,next)=>{
    try {
        if(req.session.email){
            next()
        }else{
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error)
    }
}