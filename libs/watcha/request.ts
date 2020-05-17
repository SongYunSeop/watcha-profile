import {WATCHA_HEADER} from "./constatns";

export default async (URL) => await fetch(encodeURI(URL), {headers: WATCHA_HEADER})
