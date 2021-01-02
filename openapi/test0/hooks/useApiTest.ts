import { useState, useEffect, useRef } from "react";
import { CurrentUserApi, Configuration } from "../vendor/okami";

export const useApiTest = () =>{

	//メモリリーク対策
	const mountedRef = useRef<boolean>(false);
	useEffect(() => {
		mountedRef.current = true;
		return (): void => {
		  mountedRef.current = false;
		};
	}, []);

	const [loadingFlag, setLoadingFlag] = useState(false);
	const getCurrentUser = (code: string): void => {

		setLoadingFlag(true);
		const load = async (): Promise<void> => {

			const api = new CurrentUserApi(new Configuration({
				basePath: process.env.NEXT_PUBLIC_OKAMI_API_ENDPOINT,
				accessToken: "",
			}));

			try {
				const response = await api.getCurrentUser();
				if (mountedRef.current) {
					console.log( response.data );
				}
			} catch (error) {
				throw error;
			} finally {
				setLoadingFlag(false);
			}
		};
		void load();
	};

	return { loadingFlag, getCurrentUser };

}