import adminSchema from './admin.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

    
async function Register(req,res){
    // console.log('email', req)
    try {
        let email = req.email_id;
        
        let emailDetails = await adminSchema.findOne({email_id:email}).exec();
        if(emailDetails){
            return res.json({status:'failed', message:'Email already exists'})
        }
        
        let Details = new adminSchema(req)
        if(req.password){
            let password = req.password;
            const salt = await bcrypt.genSalt(10);
            Details.password = bcrypt.hashSync(password, salt)
          }

          const result = await Details.save()
          return res.status(200).json({status:'success', message:'register successed', result:result});
       
    }catch (error) {
        return res.json({status:'error found', message:error.message})
    } 
}


async function Login(req,res){
    try {
        const email = req.email_id
        const password = req.password
        let admin = adminSchema.findOne({email_id:email})
        if(!admin){
            res.json({status:"failed", message:'! invaild user register first'});
        }else{
            bcrypt.compare(password, result.password, (err,data)=>{
                if(err){
                    return res.json({"error":err.message})
                }
                if(data){
                    console.log(result)
                    const token = jwt.sign({result},"key");
                    console.log('token',token);
                    res.status(200).json({status:"success", message:'login success!',"token":token});
                }
                
            })
        }
    } catch (error) {
        return res.status(400).json({status:'failed', message:error.message})
    }
}


async function GetAll(req, res){
    try {
        const data = await adminSchema.find().exec()
        if(data){
            return res.status(200).json({'status':'success', 'message':'data found', 'result':data})
        }else{
            return res.status(400).json({'status':'failed', 'message':'data not found'})
        }
    } catch (error) {
        return res.status(400).json({status:'failed', message:error.message})
    }
}

async function GetOne(req, res){
    try {
        const data = await adminSchema.findOne({email_id:req.email_id})
        if(data){
            return res.status(200).json({'status':'success', 'message':'data found', 'result':data})
        }else{
            return res.status(400).json({'status':'failed', 'message':'data not found'})
        }
    } catch (error) {
        return res.status(400).json({status:'failed', message:error.message})
    }
}


async function Update(req, res){
    try {
        const emailId = req.query.email_id;
       let updated = await adminSchema.findOneAndUpdate({email_id:emailId}, req.body, {new:true})
       if(!updated){
        return res.json({'status':'failed', 'message':'invalid email Id'})
       }else{
        return res.json({'status':'Success', 'message':'data updated', 'result':result})
       } 
    } catch (error) {
        return res.status(400).json({status:'failed', message:error.message})
    }
}


async function Delete(req, res){
    try {
        const emailId = req.email_id;
       let deleted = await adminSchema.findOneAndDelete({email_id:emailId})
       if(!deleted){
        return res.json({'status':'failed', 'message':'invaild email Id'})
       }else{
        return res.json({'status':'success', 'message':'data deleted'})
       }  
    } catch (error) {
        return res.status(400).json({status:'failed', message:error.message})
    }
}


export default {
    Login,
    Register,
    GetAll,
    GetOne,
    Update,
    Delete
}