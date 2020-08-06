import { createContext } from "react";
import { TAppContext } from "../types/Context";

export const AppContext = createContext<TAppContext | null>(null);