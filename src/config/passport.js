import UsersDAO from "../dao/users/users.dao.js";
import passport from "passport";
import GitHubStrategy from "passport-github2";

passport.use(
	"github",
	new GitHubStrategy(
		{
			clientID: "fb9e8938b0739791",
			clientSecret: "e3f1c132f04b4047c476e43394648743ccbe294e",
			callbackURL: "http://localhost:8080/api/sessions/githubcallback",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				console.log("==================================================");
				console.log("mensaje: ", profile);
				const user = await UsersDAO.getByEmail(profile.email);
				if (!user) {
					const newUser = await UsersDAO.postUser({
						username: profile.name,
						email: profile.email,
						password: "",
					});
					done(null, newUser);
				} else {
					done(null, user);
				}
			} catch (error) {
				done(error); // Manejar errores correctamente
			}
		}
	)
);

export default passport;
