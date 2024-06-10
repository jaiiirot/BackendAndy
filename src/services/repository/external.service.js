import { cloudinaryService } from "../cloudinary.js";
import { cryptService } from "../crypt.js";
import { jwtService } from "../jwt.js";
import { nodemailerService } from "../nodemailer.js";
import { sharpService } from "../sharp.js";
import { socketService } from "../socket.js";

import ExternalRepository from "./external.repository.js";

export const servicesExternal = new ExternalRepository(
	cloudinaryService,
	cryptService,
	jwtService,
	nodemailerService,
	sharpService,
	socketService
);
