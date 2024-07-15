import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const register = async(req,res)=>{
    try{
        const { firstName, lastName, email, password } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password:password_hash });
        await user.save();
        res.status(201).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

export const login=async(req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json('Looks like you are not registered with us!');
        }
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{ expiresIn: '1h' });
        res.status(200).json({ token });
    }catch(err){
        res.status(500).json(err);
    }
}