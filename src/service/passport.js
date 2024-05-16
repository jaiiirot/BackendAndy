import UsersDAO from "../users/users.dao.js";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import { Strategy } from "passport-jwt";
import { ENV } from "../config/config.js";

const { SECRET_COOKIE } = ENV;
const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = ENV.GITHUB;

passport.serializeUser((user, done) => {
	console.log(" serializeUser", user);
	done(null, user._id);
});

passport.deserializeUser((user, done) => {
	console.log(" deserializeUser", user);
	done(null, user);
});

passport.use(
	"jwt",
	new Strategy(
		{
			jwtFromRequest: req => {
				let token = null;
				if (req && req.signedCookies) {
					token = req.signedCookies.jwt;
				}
				return token;
			},
			secretOrKey: SECRET_COOKIE,
		},
		async function (jwtPayload, done) {
			const userId = jwtPayload.id;
			let user = await UsersDAO.getById(userId);
			if (user) {
				return done(null, user);
			} else {
				user = { role: "USER", cart: null, username: null };
				console.log("user:", user);
				return done(null, user);
			}
		}
	)
);

passport.use(
	"github",
	new GitHubStrategy(
		{
			clientID: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			callbackURL: CALLBACK_URL,
			scope: "user:email",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const user = await UsersDAO.getByEmailUserGithub(
					profile.emails[0].value
				);
				if (!user) {
					const newUser = await UsersDAO.postUser({
						username: profile.username,
						first_name: profile.displayName,
						email: profile.emails[0].value,
						password: "",
					});
					done(null, newUser);
				} else {
					done(null, user);
				}
			} catch (error) {
				console.error("Error al loguear con github:", error);
				done(error, null);
			}
		}
	)
);

export default passport;
