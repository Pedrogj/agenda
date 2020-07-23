class Contacto {
    constructor(nombre, numero) {
        this.nombre = nombre;
        this.numero = numero;
    }
}

class UI {
    addContacto(contacto) {
        const contactoList = document.getElementById('contacto-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="cajac row">
                <div class="caja2 col-md-8 text-center">
                     ${contacto.nombre}
                     ${contacto.numero}
                </div>
                <div class="col-md-4 text-center">
                <a href="#" class="botonEliminar btn btn-danger btn-sm" name="eliminar">Eliminar</a>
                </div>
            </div>
         `;
         contactoList.appendChild(element);
    }

    resetForm() {
        document.getElementById('contacto-form').reset();
    }

    deleteContacto(element) {
        if(element.name === 'eliminar') {
           element.parentElement.parentElement.parentElement.remove();
           this.showMessage('Contacto Eliminado', 'info');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // mostrando en el DOM 
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app)
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

//DOM Events
document.getElementById('contacto-form').addEventListener('submit', function(e) {
      const nombre = document.getElementById('nombre').value; 
      const numero = document.getElementById('numero').value;

      const contacto = new Contacto(nombre, numero);

      const ui = new UI();

      if(nombre === '' || numero === '') {
          return ui.showMessage('Completar campos', 'danger');
      }
      ui.addContacto(contacto);
      ui.resetForm();
      ui.showMessage('Contacto Agregado', 'success');

      e.preventDefault();
});

document.getElementById('contacto-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteContacto(e.target);   
});