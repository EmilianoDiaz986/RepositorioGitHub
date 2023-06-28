window.addEventListener('DOMContentLoaded', (event) => {
    // Obtener elementos del formulario
    const form = document.getElementById('my-form');
    const submitBtn = document.getElementById('submit-btn');
  
    // Agregar evento al botón de enviar
    form.addEventListener('submit', handleSubmit);
  
    // Agregar evento "blur" a los campos del formulario
    const formFields = form.querySelectorAll('input:not([type="submit"])');
    formFields.forEach((field) => {
      field.addEventListener('blur', handleFieldBlur);
      field.addEventListener('focus', handleFieldFocus);
    });
  
    // Actualizar el título del formulario en tiempo real
    const nombreField = document.getElementById('nombre');
    nombreField.addEventListener('keydown', updateFormTitle);
  });
  
  function handleSubmit(event) {
    event.preventDefault();
    
    // Validar el formulario antes de enviar
    const isValid = validateForm();
  
    if (isValid) {
      // Obtener los valores de los campos
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const edad = document.getElementById('edad').value;
      const telefono = document.getElementById('telefono').value;
      const direccion = document.getElementById('direccion').value;
      const ciudad = document.getElementById('ciudad').value;
      const codigoPostal = document.getElementById('codigo-postal').value;
      const dni = document.getElementById('dni').value;
  
      // Mostrar mensaje emergente con la información cargada
      const message = `
        Nombre completo: ${nombre}
        Email: ${email}
        Contraseña: ${password}
        Edad: ${edad}
        Teléfono: ${telefono}
        Dirección: ${direccion}
        Ciudad: ${ciudad}
        Código Postal: ${codigoPostal}
        DNI: ${dni}
      `;
  
      alert(message);
  
      // Reiniciar el formulario
      event.target.reset();
      updateFormTitle();
    }
  }
  
  function handleFieldBlur(event) {
    const field = event.target;
    const fieldName = field.name;
    const fieldValue = field.value;
    const errorElement = document.getElementById(`${fieldName}-error`);
    let errorMessage = '';
  
    // Realizar validación del campo
    if (fieldName === 'nombre') {
      if (!isValidFullName(fieldValue)) {
        errorMessage = 'El nombre completo debe tener más de 6 letras y al menos un espacio entre medio.';
      }
    } else if (fieldName === 'email') {
      if (!isValidEmail(fieldValue)) {
        errorMessage = 'El email debe tener un formato válido.';
      }
    } else if (fieldName === 'password') {
      if (!isValidPassword(fieldValue)) {
        errorMessage = 'La contraseña debe tener al menos 8 caracteres, formados por letras y números.';
      }
    } else if (fieldName === 'confirm-password') {
      const passwordValue = document.getElementById('password').value;
      if (fieldValue !== passwordValue) {
        errorMessage = 'Las contraseñas no coinciden.';
      }
    } else if (fieldName === 'edad') {
      if (!isValidAge(fieldValue)) {
        errorMessage = 'La edad debe ser un número entero mayor o igual a 18.';
      }
    } else if (fieldName === 'telefono') {
      if (!isValidPhoneNumber(fieldValue)) {
        errorMessage = 'El teléfono debe tener al menos 7 dígitos.';
      }
    } else if (fieldName === 'direccion') {
      if (!isValidAddress(fieldValue)) {
        errorMessage = 'La dirección debe tener al menos 5 caracteres, con letras, números y un espacio en el medio.';
      }
    } else if (fieldName === 'ciudad') {
      if (!isValidCity(fieldValue)) {
        errorMessage = 'La ciudad debe tener al menos 3 caracteres.';
      }
    } else if (fieldName === 'codigo-postal') {
      if (!isValidPostalCode(fieldValue)) {
        errorMessage = 'El código postal debe tener al menos 3 caracteres.';
      }
    } else if (fieldName === 'dni') {
      if (!isValidDNI(fieldValue)) {
        errorMessage = 'El DNI debe tener 7 u 8 dígitos.';
      }
    }
  
    // Mostrar mensaje de error si existe
    if (errorMessage) {
      errorElement.textContent = errorMessage;
    }
  }
  
  function handleFieldFocus(event) {
    const field = event.target;
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    // Limpiar mensaje de error
    errorElement.textContent = '';
  }
  
  function updateFormTitle() {
    const nombre = document.getElementById('nombre').value;
    const formTitle = document.getElementById('form-title');
    formTitle.textContent = `HOLA ${nombre}`;
  }
  
  // Funciones de validación
  
  function isValidFullName(value) {
    const fullNameRegex = /^[a-zA-Z]+\s+[a-zA-Z]+$/;
    return fullNameRegex.test(value) && value.length > 6;
  }
  
  function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
  
  function isValidPassword(value) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(value);
  }
  
  function isValidAge(value) {
    return Number.isInteger(parseInt(value, 10)) && parseInt(value, 10) >= 18;
  }
  
  function isValidPhoneNumber(value) {
    const phoneNumberRegex = /^\d{7,}$/;
    return phoneNumberRegex.test(value);
  }
  
  function isValidAddress(value) {
    const addressRegex = /^[a-zA-Z0-9]+\s+[a-zA-Z0-9\s]+$/;
    return addressRegex.test(value) && value.length >= 5;
  }
  
  function isValidCity(value) {
    return value.length >= 3;
  }
  
  function isValidPostalCode(value) {
    return value.length >= 3;
  }
  
  function isValidDNI(value) {
    const dniRegex = /^\d{7,8}$/;
    return dniRegex.test(value);
  }
  