import UsersDAO from "../dao/users.dao.js";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import { Strategy } from "passport-jwt";
import { ENV } from "./config.js";

const { SECRET_COOKIE } = ENV;
const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = ENV.GITHUB;

passport.serializeUser((user, done) => {
	// console.log("Serialize:", user);
	done(null, user._id);
});

passport.deserializeUser((obj, done) => {
	// console.log("Deserialize:", obj);
	// console.log("Done:", done);
	done(null, obj);
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
			const user = await UsersDAO.getById(userId);
			console.log("User:", user);
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
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
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// console.log("Profile:", profile);
				const user = await UsersDAO.getByNameUserGithub(profile._json.name);
				if (!user) {
					const newUser = await UsersDAO.postUser({
						username: profile._json.name,
						email: profile._json.email,
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
