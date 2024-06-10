export const emailResetPassword = (email, token) => {
	return `
        <div style="max-width:600px;padding:20px;margin:auto;">
        <header style="margin:0; overflow:hidden;">
            <a href="http://localhost:8080/" style="display:inline-block; color:#000000;text-decoration:none; float:left; margin:0;padding:0;"
            target="_blank"
            data-saferedirecturl="https://www.google.com/url?q=http://localhost:8080/&amp;source=gmail&amp;ust=1718085780557000&amp;usg=AOvVaw1eXv_DC61u5KGVsOHjmBwf">
            <img src="https://raw.githubusercontent.com/jaiiirot/backend-ilicito/main/src/public/image/logo.png" alt="ILICITO" style="height: 2rem;">
            </a>
            <div style="float:right; font-size:1.6rem;">
            <span>SOPORTE TECNICO</span>
            </div>
        </header>
        <div style="margin-bottom:25px">
            <div>
            <h1 style="">Recuperación de contraseña</h1>
            <h4 style="margin:5px 0;padding 0;">Usted Solicitó Recuperación de su contraseña</h4>
            <p style="margin:5px 0;padding 0;">${email}</p>
            <p style="margin:5px 0;padding:0;">
                Haga clic en el siguiente botón o copie y pegue el siguiente enlace en el navegador:
            </p>
            </div>
            <a href="http://localhost:8080/reset/password/${token}"
            style="display:inline-block;padding:10px 20px;background-color:#000000;color:#ffffff;text-decoration:none;margin:20px 0"
            target="_blank"
            data-saferedirecturl="https://www.google.com/url?q=http://localhost:8080/reset/password/${token}">Recuperar
            contraseña</a>
            <div>
            <p style="margin:5px 0;padding:0;">Si usted no puede ingresar por el botón, este es el enlace:</p>
            <a href="http://localhost:8080/reset/password/${token}"
                style="display:inline-block;margin:5px 0;padding:0;color: #555555; font-size: 13px;" target="_blank"
                data-saferedirecturl="https://www.google.com/url?q=http://localhost:8080/reset/password/asdhh12g78dhs17wgd7idhsu1idhwp1udhwpm1dhp1hdup1uwhd1w0892hd98wdh1w8dh1wd9wh98dsd&amp;source=gmail&amp;ust=1718085780557000&amp;usg=AOvVaw00kCBf_-b_k6E3vVMLTJ-Z">
                http://localhost:8080/reset/password/${token}
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

export const emailTicket = (data) =>{
    return `
    <div class="" >
    
    </div>
    `
}
