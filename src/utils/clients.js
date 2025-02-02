import {createThirdwebClient} from "thirdweb";

export const client = createThirdwebClient({
	clientId: import.meta.env.VITE_NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "defaultClientId",
	secretKey: import.meta.env.VITE_NEXT_PUBLIC_THIRDWEB_SECRET_KEY || "defaultSecretKey",
});

