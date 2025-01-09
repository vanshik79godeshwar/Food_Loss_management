import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "e7.pngegg.com",
				port: "",
				pathname: "/pngimages/779/61/**",
				search: "",
			},
		],
	},
};

export default nextConfig;
