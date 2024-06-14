export default class UsersDTO {
	constructor(data) {
		this.username = data.username || "";
		this.photo_user = data.photo_user || "/image/sinavatar.png";
		this.first_name = data.first_name || "";
		this.last_name = data.last_name || "";
		this.email = data.email || "";
		this.password = data.password || "";
		this.age = data.age || "";
		this.cart = { cid: data.cart._id } || {};
		this.messages = { mid: data.messages._id } || {};
	}
}
