import UsersDAO from "../dao/users/users.dao.js";
import passport from "passport";
import GitHubStrategy from "passport-github2";

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

passport.use(
	"github",
	new GitHubStrategy(
		{
			clientID: "Iv1.fb9e8938b0739791",
			clientSecret: "e3f1c132f04b4047c476e43394648743ccbe294e",
			callbackURL: "http://localhost:8080/api/sessions/auth/github/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				console.log("Profile:", profile);
				const user = await UsersDAO.getByNameUserGithub(profile._json.name);
				if (!user) {
					const newUser = await UsersDAO.postUser({
						username: profile._json.name,
						email: "",
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
