import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function LoginPage() {
	return (
		<div className="container d-flex justify-content-center" Style="min-height: 100vh;">
		<div className="row justify-content-center align-self-center">
			<div className="card" Style="min-height: 30em">
				<div className="card-body">
					<h1 className="card-title text-center">Iniciar sesión</h1>
					<form className="container">
						<div className="form-group row">
							<label className="col-4 col-form-label" for="username">Usuario</label>
							<div className="col">
								<input id="username" className="form-control" type="text" name="username" placeholder="Ingrese el usuario"></input>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-4 col-form-label" for="password">Contraseña</label>
							<div className="col">
								<input id="password" className="form-control" type="password" name="password" placeholder="Ingrese la contraseña"></input>
							</div>
						</div>
						<button className="btn btn-primary" Style="width: 100%" type="submit">Entrar</button>
					</form>
				</div>
			</div>
		</div>
		</div>
	);
}

export default LoginPage;