import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import connectDB from "./lib/connectDB"
import Users from '../../models/userModel'
import DefaultLists from '../../models/defaultListModel'
import bcrypt from 'bcrypt'

connectDB()

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text", placeholder: "johndoe@anon.com"},
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const [email, password] = [credentials.email, credentials.password]
          const user = await Users.findOne({ email })
          if (!user) {
            throw new Error("You haven't registered yet")
          }
          if (user) {
            return signInUser({user, password})
          }
        }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        let userExist = await DefaultLists.countDocuments({user_id: token.sub})
        if (!userExist) {
          await DefaultLists.create({user_id: token.sub})
        }
      }
      return token
    },
    async session ({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub
      }
      if (token) {
        session.accessToken = token.accessToken
      }
      return session
    }
  },
  database: process.env.MONGODB_URI,
  secret: 'secret',
})

const signInUser = async({ user, password }) => {
  if (!user.password) {
    throw new Error('Please enter password')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Password not correct (CHANGE LATER TO BE VAGUE)')
  }
  return user
}