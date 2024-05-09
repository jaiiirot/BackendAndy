import UsersDAO from "../users/users.dao.js";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import { Strategy } from "passport-jwt";
// import { Strategy as localStrategy } from "passport-local";
import { ENV } from "../config/config.js";

const { SECRET_COOKIE } = ENV;
const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = ENV.GITHUB;

passport.serializeUser((user, done) => {
	console.log("Estoy en serializeUser");
	done(null, user._id);
});

passport.deserializeUser((user, done) => {
	console.log("Estoy en deserializeUser");
	done(null, user);
});

// passport.use(
// 	new localStrategy.LocalStrategy(function (username, password, done) {
// 		User.findOne({ username }, function (err, user) {
// 			if (err) {
// 				return done(err);
// 			}
// 			if (!user) {
// 				return done(null, false);
// 			}
// 			if (!user.verifyPassword(password)) {
// 				return done(null, false);
// 			}
// 			return done(null, user);
// 		});
// 	})
// );

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
			console.log(user);
			if (user) {
				console.log("Estoy en passport.use done");
				return done(null, user);
			} else {
				console.log("Estoy en passport.use false");
				user = { role: "USER" };
				return done(null, done);
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
					console.log(newUser);
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
