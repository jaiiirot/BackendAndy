import { de } from "@faker-js/faker";
import { ObjectId } from "mongodb";

export const mockprod = {
	productfile: {
		title:
			"Apple iPhone 15 Pro (128 0GB) - Titanio Negro - Distribuidor autorizado",
		description: `Lo que tenés que saber de este producto
    Memoria RAM: 8 GB
    Memoria interna: 128 GB
    Diseño resistente y ligero
    Pantalla Super Retina XDR con ProMotion con frecuencia de actualización hasta 120 Hz
    La Dynamic Island muestra alertas y actividades en vivo al instante
    Sistema de cámaras pro de super alta resolución
    Botón de acción personalizable para ir a tu funcionalidad favorita
    Con conector USB-C y WiFi 6 con el doble de velocidad
    Funcionalidad esencial de seguridad con detección de choques para pedir ayuda
    Con tecnologías de privacidad que te ayudan a mantener el control de tus datos`,
		code: "IPHONE15PRO",
		price: 2799999,
		status: "on",
		promocion: "on",
		stock: 2,
		type: "celular",
		genre: "iphone",
		category: "tecnologia,celular,iphone,15,pro,128GB",
		files: [
			"./src/tests/img/testiphone1.webp",
			"./src/tests/img/testiphone2.webp",
			"./src/tests/img/testiphone3.webp",
			"./src/tests/img/testiphone4.webp",
		],
		owner: "60f7c5f6d2d0f8a8b8b1f5f2",
	},
	producturl: {
		title: "Xiaomi Redmi 10c Dual Sim 128gb Verde menta 4gb Ram",
		description: `Lo que tenés que saber de este producto
Dispositivo liberado para que elijas la compañía telefónica que prefieras.
Pantalla IPS de 6.71".
Tiene 2 cámaras traseras de 50Mpx/2Mpx.
Cámara delantera de 5Mpx.
Procesador Snapdragon 680 Octa-Core de 2.4GHz con 4GB de RAM.
Batería de 5000mAh.
Memoria interna de 128GB.
Con reconocimiento facial y sensor de huella dactilar.`,
		code: "XIAOMIREDMI10C",
		price: 249999,
		status: "on",
		promocion: "on",
		stock: 10,
		type: "celular",
		genre: "xiaomi",
		category: "tecnologia,celular,xiaomi,redmi,10c,128GB",
		photoUrl: [
			"https://http2.mlstatic.com/D_NQ_NP_635992-MLA49949491752_052022-O.webp",
			"https://http2.mlstatic.com/D_NQ_NP_774292-MLA50342622467_062022-O.webp",
			"https://http2.mlstatic.com/D_NQ_NP_986875-MLU75182640336_032024-O.webp",
			"https://http2.mlstatic.com/D_NQ_NP_634050-MLU70065109421_062023-O.webp",
		],
		owner: "60f7c5f6d2d0f8a8b8b1f5f2",
	},
	putproduct: {
		title: "JAIRO Memoria Ram Ddr4 16gb 3200mhz Xpg Spectrix D45 Rgb 1x16gb",
		description:
			"Lo que tenés que saber de este producto\r<br>Optimizá el rendimiento de tu máquina con la tecnología DDR4 SDRAM.\r<br>Memoria con formato DIMM.\r<br>Alcanza una velocidad de 3200 MHz.\r<br>Apta para servidores.\r<br>Cuenta con una tasa de transferencia de 25600 MB/s.",
		code: "#nk64sa",
		price: 58990,
		status: true,
		promocion: false,
		stock: 3,
		type: "accesorio",
		genre: "masculino",
		category: ["ram", "ddr4", "16gb", "3200mhz"],
		owner: "60f7c5f6d2d0f8a8b8b1f5f2",
	},
};
