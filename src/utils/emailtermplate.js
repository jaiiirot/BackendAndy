export const emailResetPassword = (host, email, token) => {
	return `
        <div style="max-width:600px;padding:20px;margin:auto;">
        <header style="margin:0; overflow:hidden;">
            <a href="http://${host}/" style="display:inline-block; color:#000000;text-decoration:none; float:left; margin:0;padding:0;"
            target="_blank"
            data-saferedirecturl="https://www.google.com/url?q=http://${host}/&amp;source=gmail&amp;ust=1718085780557000&amp;usg=AOvVaw1eXv_DC61u5KGVsOHjmBwf">
            <img src="https://raw.githubusercontent.com/jaiiirot/backend-ilicito/main/src/public/image/logo.png" alt="ILICITO" style="height: 2rem;">
            </a>
            <div style="float:right; font-size:1.6rem;">
            <span>SOPORTE TECNICO</span>
            </div>
        </header>
        <div style="margin-bottom:25px">
            <div>
            <h1 style="margin:5px 0;padding: 0;">Recuperación de contraseña</h1>
            <h4 style="margin:0;padding: 0;">Usted Solicitó Recuperación de su contraseña</h4>
            <p style="margin:0;padding 0;">${email}</p>
            <p style="margin:0;padding:0;">
                Haga clic en el siguiente botón o copie y pegue el siguiente enlace en el navegador:
            </p>
            </div>
            <a href="http://${host}/reset/password/${token}"
            style="display:inline-block;padding:10px 20px;background-color:#000000;color:#ffffff;text-decoration:none;margin:20px 0"
            target="_blank"
            data-saferedirecturl="https://www.google.com/url?q=http://${host}/reset/password/${token}">Recuperar
            contraseña</a>
            <div>
            <p style="margin:5px 0;padding:0;">Si usted no puede ingresar por el botón, este es el enlace:</p>
            <a href="http://${host}/reset/password/${token}"
                style="display:inline-block;margin:5px 0;padding:0;color: #555555; font-size: 13px;" target="_blank"
                data-saferedirecturl="https://www.google.com/url?q=http://${host}/reset/password/asdhh12g78dhs17wgd7idhsu1idhwp1udhwpm1dhp1hdup1uwhd1w0892hd98wdh1w8dh1wd9wh98dsd&amp;source=gmail&amp;ust=1718085780557000&amp;usg=AOvVaw00kCBf_-b_k6E3vVMLTJ-Z">
                http://${host}/reset/password/${token}
            </a>
            </div>
            <p style="margin:5px 0;padding:0;">Si usted no solicitó la recuperación de su contraseña, ignore este mensaje.
            </p>
        </div>
        <footer style="margin-top:20px;font-size:0.9em;color:#666666">
            © 2024 ILICITO. Todos los derechos reservados by <a href="https://github.com/jaiiirot" target="_blank">jaiiirot</a>.
        </footer>
        </div>
    `;
};

export const emailPurchaseConfirmation = (
	host,
	email,
	orderNumber,
	products
) => {
	const productItems = products
		.map(
			product => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <strong>${product.pid.title}</strong>
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">
                ${product.quantity}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
                $${product.pid.price.toFixed(2)}
            </td>
        </tr>
    `
		)
		.join("");

	const total = products.reduce(
		(sum, product) => sum + product.pid.price * product.quantity,
		0
	);

	return `
        <div style="max-width:600px;padding:20px;margin:auto;font-family:Arial,sans-serif;">
            <header style="margin:0; overflow:hidden; border-bottom: 2px solid #000;">
                <a href="http://${host}/" style="display:inline-block; color:#000000;text-decoration:none; float:left; margin:0;padding:0;" target="_blank">
                    <img src="https://raw.githubusercontent.com/jaiiirot/backend-ilicito/main/src/public/image/logo.png" alt="ILICITO" style="height: 2rem;">
                </a>
            </header>
            <div style="margin-bottom:25px; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h1 style="margin:5px 0;padding: 0; color: #333;">Compra Finalizada</h1>
                <h4 style="margin:0;padding: 0; color: #666;">Gracias por su compra</h4>
                <p style="margin:0;padding: 0; color: #666;">${email}</p>
                <p style="margin:0;padding:0; color: #666;">Número de orden: ${orderNumber}</p>
                <table style="width:100%;border-collapse:collapse;margin-top:20px;">
                    <thead>
                        <tr style="background-color: #f5f5f5;">
                            <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: left;">Producto</th>
                            <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: center;">Cantidad</th>
                            <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: right;">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productItems}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" style="padding: 10px; border-top: 2px solid #ddd; text-align: right; font-weight: bold;">Total</td>
                            <td style="padding: 10px; border-top: 2px solid #ddd; text-align: right; font-weight: bold;">$${total.toFixed(
															2
														)}</td>
                        </tr>
                    </tfoot>
                </table>
                <p style="margin:20px 0 5px 0;padding:0; color: #666;">Su pedido será procesado y enviado a la brevedad.</p>
                <p style="margin:5px 0;padding:0; color: #666;">Si tiene alguna pregunta, por favor contacte a nuestro soporte técnico.</p>
            </div>
            <footer style="margin-top:20px;font-size:0.9em;color:#666666;text-align:center;">
                © 2024 ILICITO. Todos los derechos reservados by <a href="https://github.com/jaiiirot" target="_blank" style="color: #000;">jaiiirot</a>.
            </footer>
        </div>
    `;
};

export const emailPasswordChangeConfirmation = (host, email) => {
	return `
        <div style="max-width:600px;padding:20px;margin:auto;">
            <header style="margin:0; overflow:hidden;">
                <a href="http://${host}/" style="display:inline-block; color:#2E8B57;text-decoration:none; float:left; margin:0;padding:0;" target="_blank">
                    <img src="https://example.com/logo.png" alt="Logo" style="height: 2rem;">
                </a>
                <div style="float:right; font-size:1.6rem;">
                    <span>SOPORTE TECNICO</span>
                </div>
            </header>
            <div style="margin-bottom:25px">
                <div>
                    <h1 style="margin:5px 0;padding: 0;">Cambio de contraseña confirmado</h1>
                    <h4 style="margin:0;padding: 0;">Hola,</h4>
                    <p style="margin:0;padding 0;">Hemos recibido su solicitud de cambio de contraseña. Ahora puede disfrutar de su experiencia de compra en nuestra plataforma.</p>
                </div>
                <div>
                    <a href="http://${host}/productos" style="display:inline-block;padding:10px 20px;background-color:#2E8B57;color:#ffffff;text-decoration:none;margin:20px 0" target="_blank">Ir a comprar</a>
                    <a href="http://${host}/login" style="display:inline-block;padding:10px 20px;background-color:#FF4500;color:#ffffff;text-decoration:none;margin:20px 0" target="_blank">Iniciar sesión</a>
                </div>
            </div>
            <footer style="margin-top:20px;font-size:0.9em;color:#666666">
                © ${new Date().getFullYear()} Ilicito. Todos los derechos reservados by <a href="https://github.com/tu-usuario" target="_blank">Tu Nombre</a>.
            </footer>
        </div>
    `;
};
