import { parseAsInteger, parseAsString } from "nuqs";

export const serverString = parseAsString.withOptions({ shallow: false });
export const serverInteger = parseAsInteger.withOptions({ shallow: false });
