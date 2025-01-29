import {createThirdwebClient} from "thirdweb";

export const client = createThirdwebClient({
	clientId: import.meta.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || undefined,
	secretKey: import.meta.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY || "",
});