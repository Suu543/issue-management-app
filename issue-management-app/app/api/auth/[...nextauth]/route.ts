import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import authOptions from "@/app/auth/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
