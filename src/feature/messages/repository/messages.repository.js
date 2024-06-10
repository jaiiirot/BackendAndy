import { servicesExternal } from "../../../services/repository/external.service.js";
export default class MessagesRepository {
	constructor(dao) {
		this.dao = dao;
	}

	async post(data) {
		return await this.dao.addMessage(data);
	}

	async getAll() {
		return await this.dao.getAll();
	}

	async getById(mid) {
		return await this.dao.getById(mid);
	}

	async getChatById(mid) {
		const chat = await this.dao.getById(mid);
		console.log(chat.messages);
		return chat.messages;
	}

	async postAddMessageInChat(id, role, message) {
		// console.log(id, email, message);
		return await this.dao.postMessage(id, role, message);
	}

	async delete(mid) {
		return await this.dao.delete(mid);
	}

	async deleteClearMessageInChat(messageId) {
		return await this.dao.deleteClearMessage(messageId);
	}

	async postMessageByEmail(email) {
		await servicesExternal.sendMail(
			email,
			"Recuperar contraseña",
			"Recuperar contraseña",
			` 
<div style="max-width:600px;padding:20px;text-align:center">
    <header style="margin: auto;justify-content: center;text-align:center;align-items: center;">
      <a href="http://localhost:8080/" style="color:#000000;text-decoration:none;font-size:2rem" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://localhost:8080/&amp;source=gmail&amp;ust=1718085780557000&amp;usg=AOvVaw1eXv_DC61u5KGVsOHjmBwf">
        <span style="width:2rem;height:2rem;background-color:#000000;color:#ffffff;display:flex;border-radius:50%;font-size:1.5rem"></span>ILICITO
      </a>
    </header>
    <div style="margin-bottom:25px">
      <h1 style="margin:0;padding:0">Recuperación de Contraseña</h1>
      <p style="margin:0;padding:0"><a href="mailto:tumiricha123@gmail.com" target="_blank">tumiricha123@gmail.com</a></p>
      <h4 style="margin:0;padding:0">Usted Solicitó Recuperación de su contraseña</h4>
      <p>Haga clic en el siguiente botón o copie y pegue el siguiente enlace en el navegador:</p>
      <a href="http://localhost:8080/reset/password/asdhh12g78dhs17wgd7idhsu1idhwp1udhwpm1dhp1hdup1uwhd1w0892hd98wdh1w8dh1wd9wh98dsd" style="display:inline-block;padding:10px 20px;background-color:#000000;color:#ffffff;text-decoration:none;border-radius:15px;margin:5px 0" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://localhost:8080/reset/password/asdhh12g78dhs17wgd7idhsu1idhwp1udhwpm1dhp1hdup1uwhd1w0892hd98wdh1w8dh1wd9wh98dsd&amp;source=gmail&amp;ust=1718085780557000&amp;usg=AOvVaw00kCBf_-b_k6E3vVMLTJ-Z">Recuperar Contraseña</a>
      <div>
        <p>Si usted no puede ingresar por el botón, este es el enlace:</p>
        <a href="http://localhost:8080/reset/password/asdhh12g78dhs17wgd7idhsu1idhwp1udhwpm1dhp1hdup1uwhd1w0892hd98wdh1w8dh1wd9wh98dsd" style="word-break:break-all" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://localhost:8080/reset/password/asdhh12g78dhs17wgd7idhsu1idhwp1udhwpm1dhp1hdup1uwhd1w0892hd98wdh1w8dh1wd9wh98dsd&amp;source=gmail&amp;ust=1718085780557000&amp;usg=AOvVaw00kCBf_-b_k6E3vVMLTJ-Z">
          http://localhost:8080/reset/<wbr>password/<wbr>asdhh12g78dhs17wgd7idhsu1idhwp<wbr>1udhwpm1dhp1hdup1uwhd1w0892hd9<wbr>8wdh1w8dh1wd9wh98dsd
        </a>
      </div>
      <p>Si usted no solicitó la recuperación de su contraseña, ignore este mensaje.</p>
    </div>
    <footer style="margin-top:20px;font-size:0.9em;color:#666666">
      © 2024 ILICITO. Todos los derechos reservados.
    </footer>
  </div>
  `
		);
		return email;
	}
}
