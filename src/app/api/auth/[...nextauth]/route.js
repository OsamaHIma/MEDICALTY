import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;
        const userType = credentials.userType;
        const data = await SignIn(email, password, userType);
        if (!data.token) {
          throw new Error(data);
        }
        return { token: data.token, ...data, userType, email };
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

const SignIn = async (email, password, userType) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${
        userType === "admin" ? "center/admin" : userType
      }/login`,
      { email, password }
    );
    return data;
  } catch (resp) {
    return resp.response.msg;
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };