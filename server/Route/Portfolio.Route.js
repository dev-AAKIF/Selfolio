import { Router} from "express"
import {getPortfolioData} from '../Controllers/Portfolio.Controller.js'

const router = Router()
router.get('/', getPortfolioData);


export default router;