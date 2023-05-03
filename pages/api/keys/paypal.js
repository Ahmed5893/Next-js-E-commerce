const { getSession } = require("next-auth/react")


const handler=async(req,res)=>{
const session=await getSession({req});
if(!session){
return res.status(401).send('Sign in requires')
}
res.send('AV_6IEigzgdj4yAw94WebhIqn0lEoyEV4bmBql7zQj0X7IVTin_5rM2tKu1JUgdZ3rFUAVKqgahYIeOc'||'sb')

}

export default handler;