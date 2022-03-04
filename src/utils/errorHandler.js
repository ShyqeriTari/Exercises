
export const errorHandler = (err, req, res, next) => {
if(err){
res.send(err.httpStatusCode || 500).send(err)
}
next()
}