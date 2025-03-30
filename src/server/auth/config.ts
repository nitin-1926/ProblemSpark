import { prisma } from '@/lib/prisma';
import { signInSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { type DefaultSession, type NextAuthConfig, type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string;
			// ...other properties
			// role: UserRole;
		} & DefaultSession['user'];
	}

	// Instead of redefining User, extend it
	interface User {
		// Custom properties can be added here
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'jsmith@gmail.com' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async credentials => {
				try {
					const { email, password } = await signInSchema.parseAsync(credentials);
					const dbUser = await prisma.user.findUnique({
						where: { email },
					});
					if (!dbUser) {
						throw new Error('User not found');
					}
					if (!dbUser.password) {
						throw new Error('Invalid password');
					}
					const passWordMatch = await bcrypt.compare(password, dbUser.password);
					if (!passWordMatch) {
						throw new Error('Invalid password');
					}

					// Convert numeric ID to string for NextAuth
					const user: User = {
						id: String(dbUser.id),
						email: dbUser.email,
						name: dbUser.name,
					};

					return user;
				} catch (error) {
					return null;
				}
			},
		}),
		/**
		 * ...add more providers here.
		 *
		 * Most other providers require a bit more work than the Discord provider. For example, the
		 * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
		 * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
		 *
		 * @see https://next-auth.js.org/providers/github
		 */
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				id: token.sub,
			},
		}),
	},
} satisfies NextAuthConfig;
