import {WATCHA_HEADER} from "./constatns";

export default async (URL) => await fetch(URL, {headers: WATCHA_HEADER})
