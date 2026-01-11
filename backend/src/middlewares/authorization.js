export const authorization = (req, res, next) => {
    if(!req.user){
        res.status(401).json({message : "Unauthorizeddd"});
    }

    if(req.user.role !== "admin"){
         res.status(401).json({message : "You are not permitted to do this work brother!"});
    }

    next();
}