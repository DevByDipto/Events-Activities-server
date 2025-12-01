import { Router } from "express";



export const router = Router()

const routes= [
   
   
]

routes.forEach((route)=>router.use(route.path,route.route))

  