import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github" || account.provider === "google") {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        let newUser={
          email:user.email,
          username:user.name,
          profilePic:user.image,
          type:"retailer"
        }
        try {
          const response = await axios.post("http://localhost:5000/user/signUp", newUser, config);
          // console.log("User signup successful:", response.data);
          user._id=response.data._id
        } catch (error) {
          console.error("Error signing up user:", error.response?.data || error.message);
          return false; // Block sign-in if signup fails
        }
      }
      return true; // Allow sign-in
    },
    async jwt({ token, user }) {
      // Add MongoDB ID to the token during the first login
      if (user) {
        token._id = user._id; // MongoDB `_id` saved in the JWT token
      }
      return token;
    },

    async session({ session, token }) {
      // Pass the MongoDB ID to the session object
      session.user._id = token._id;
      return session;
    },
  },
});
export { handler as GET, handler as POST };