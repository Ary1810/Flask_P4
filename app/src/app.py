from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/")
def inicio():
    return render_template("public/index.html")

@app.route("/perfil")
def perfil():
    return render_template("public/perfil.html")


@app.route("/tienda")
def tienda():
    return render_template("public/tienda.html")


@app.route("/contactanos")
def contactanos():
    return render_template("public/Formulario.html")


if __name__ == "__main__":
    app.run(debug=True)