export default class UsersDto {
	constructor(data) {
		this.username = data.username;
		this.first_name = data.first_name;
		this.last_name = data.last_name;
		this.email = data.email;
		this.password = data.password;
		this.age = data.age;
		this.cart = data.cart;
		this.admin = data.admin;
	}
}
