import UserSignup from "../models/signup.model.js";
import session from "express-session";
import bcrypt from 'bcryptjs';


export const getSignup = async (req, res) => {
    try {
        return res.status(200).render('signupPage', { message: null })
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

export const getLogin = async (req, res) => {
    try {
        if (req.session.email) {
            return res.status(200).redirect('/')
        } else {
            return res.status(200).render('loginPage', { message: null })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

export const getHome = async (req, res) => {
    try {
        return res.status(200).render('homePage', {
            message: req.session.email
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

export const postSignup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('signupPage', { message: 'Email and password are required.' });
        }

        // check existing user to provide friendly error (prevents duplicate key error)
        const existing = await UserSignup.findOne({ email });
        if (existing) {
            return res.status(409).render('signupPage', { message: 'Email is already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserSignup.create({ email, password: hashedPassword });
        return res.status(201).redirect('/login');
    } catch (error) {
        // handle duplicate key error (race condition)
        if (error && error.code === 11000) {
            return res.status(409).render('signupPage', { message: 'Email is already registered.' });
        }
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

export const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await UserSignup.findOne({ email });
        // return res.status(200).json({
        //     checkUser
        // })
        if (!checkUser) {
            return res.status(400).render('loginPage', { message: "Invalid Email!" })
        }
        const isMatchPassword = await bcrypt.compare(password, checkUser.password)
        if (!isMatchPassword) return res.status(400).render('loginPage', { message: "Invalid Password!" })
        req.session.email = email;
        return res.redirect('/')

    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}
export const getLogout = async (req, res) => {
    try {
        await req.session.destroy(() => {
            res.redirect('/login');
        })
    } catch (error) {
        console.error(error)
    }
}