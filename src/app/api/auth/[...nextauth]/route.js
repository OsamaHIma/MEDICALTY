// import axios from "axios";
// import jwt from "jsonwebtoken";
// import NextAuth from "next-auth/next";

// const jwtSecret = process.env.JWT_SECRET;

// const SignIn = async (email, password, userType) => {
//   console.log("sign called");
//   console.log(
//     `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/${
//       userType === "admin" ? "center/admin" : userTye
//     }/login`
//   );
//   try {
//     const { data } = await axios.post(
//       `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/${
//         userType === "admin" ? "center/admin" : userTye
//       }/login`,
//       { email, password }
//     );
//     return data;
//   } catch (error) {
//     throw new Error(error.response.data.message);
//   }
// };

// const JWTAuth = async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { email, password, userType } = req.body;
//   const data = await SignIn(email, password, userType);
//   console.log(data)

//   if (!data.token) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const token = jwt.sign({ email, userType }, jwtSecret);

//   return res.status(200).json({ token });
// };

// const authOptions = {
//   providers: [
//     {
//       id: "jwt",
//       name: "JWT",
//       type: "credentials",
//       credentials: {
//         async authorize(credentials) {
//           const { email, password, userType } = credentials;
//           const response = await fetch("/api/login", {
//             method: "POST",
//             body: JSON.stringify({ email, password, userType }),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });
//           const data = await response.json();

//           if (!data.token) {
//             throw new Error(data);
//           }

//           const token = jwt.sign({ email, userType }, jwtSecret);

//           return { token, ...data };
//         },
//       },
//     },
//     {
//       id: "google",
//       name: "Google",
//       type: "oauth",
//       version: "2.0",
//       scope: "openid email profile",
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//   ],

//   callbacks: {
//     jwt(token, user) {
//       return { ...token, user };
//     },

//     session(session, token) {
//       return { ...session, user: token.user };
//     },
//   },

//   pages: {
//     signIn: "/auth/login",
//   },

//   session: {
//     jwt: {
//       secret: jwtSecret,
//     },
//   },

//   secret: jwtSecret,
// };

// const handler = NextAuth({
//   ...authOptions,
//   callbacks: {
//     ...authOptions.callbacks,
//     signIn: JWTAuth,
//   },
// });
// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
    return resp.response.data.message;
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
