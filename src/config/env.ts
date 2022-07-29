const dev = process.env.NEXT_PUBLIC_NODE_ENV !== "production";

export const server = dev
    ? "http://localhost:3333/business"
    : process.env.NEXT_PUBLIC_URL;