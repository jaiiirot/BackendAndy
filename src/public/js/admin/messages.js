const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", async () => {
  await Swal.fire({
    title: "Iniciar Sesion",
    html: `
      <input id="swal-input1" class="swal2-input" type="email" name="email" placeholder="Email">
      <input id="swal-input2" class="swal2-input" type="password" name="password" placeholder="Contraseñas">
    `,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Iniciar Sesion",
    denyButtonText: "Registrarme",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      return {
        email: document.getElementById("swal-input1").value,
        password: document.getElementById("swal-input2").value,
      };
    },
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      console.log(result);
      fetch("/api/users/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.value),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: data.error,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Bienvenido",
              text: data.message,
            });
            setTimeout(() => {
              if (data.user.type === "admin") {
                window.location.href = `/panel/${data.user._id}`;
              } else window.location.href = `/`;
            }, 1000);
          }
        });
    }
    if (result.isDenied) {
      Swal.fire({
        title: "Registrarse",
        html: `
          <input id="swal-input0" class="swal2-input" type="text" name="username" placeholder="Nombre">
          <input id="swal-input1" class="swal2-input" type="email" name="email" placeholder="Email">
          <input id="swal-input2" class="swal2-input" type="password" name="password" placeholder="Contraseñas">
        `,
        confirmButtonText: "Registrarme",
        preConfirm: () => {
          return {
            username: document.getElementById("swal-input0").value,
            email: document.getElementById("swal-input1").value,
            password: document.getElementById("swal-input2").value,
          };
        },
      }).then((result) => {
        fetch("/api/users/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result.value),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.error,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Bienvenido",
                text: data.message,
              });
            }
          });
      });
    }
  });
});
