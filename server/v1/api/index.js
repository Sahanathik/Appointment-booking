import express from 'express'
const app = express()

import User from './User/user.router.js';
import Admin from './Admin/admin.router.js';
import Departments from './Departments/departments.router.js';
import Specialist from './Specialist/specialist.router.js';
import appSettings from './App_Settings/app.router.js';
import paymentSettings from './Payment_Settings/payment.router.js';
import Appointment from './User/user.router.js';
import Track from './OP_Tracking/tracking.router.js';


app.use('/user', User)
app.use('/admin', Admin)
app.use('/departements', Departments)
app.use('/specialist', Specialist)
app.use('/appSettings', appSettings)
app.use('/paymentSettings', paymentSettings)
app.use('/book', Appointment)
app.use('/track', Track)

export default app;