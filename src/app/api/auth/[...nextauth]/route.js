import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;
        const userRole = credentials.userRole;
        const data = await SignIn(email, password, userRole);
        if (!data.data["Your Data"].token) {
          throw new Error(data);
        }
        return { token: data.data["Your Data"].token, ...data.data["Your Data"], userRole, email };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      /* Step 1: update the token based on the user object update token for backend  */
      if (user) {
        token.token = user.token;
        token.user = { ...user };
      }
      return token;
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object update session for frontend */
      if (token && session.user) {
        session.user.token = token.token;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};

const SignIn = async (email, password, userRole) => {
  console.log(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/${
      userRole === "admin" ? "center/admin" : userRole
    }/login`,
    email,
    password
  );
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${
        userRole === "admin" ? "center/admin" : userRole
      }/login`,
      { email, password }
    );
    return data;
  } catch (error) {
    console.log("error signing in" + error);
    return error;
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
