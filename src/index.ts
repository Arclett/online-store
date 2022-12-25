import "./styles/main.scss";

import { Loader } from "./script/classes/_Loader";
import { Router } from "./script/classes/_Router";
import { Main } from "./script/classes/_Main";

export const loader = new Loader();
export const main = new Main();
export const router = new Router();
