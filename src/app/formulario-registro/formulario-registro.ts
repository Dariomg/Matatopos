import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { HalloweenService } from '../services/halloween';
import { NavidadService } from '../services/navidad';

@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-registro.html',
  styleUrls: ['./formulario-registro.css']
})
export class FormularioRegistro {
  formulario: FormGroup;
  mensajeExito = '';
  mensajeCuentaAtras = '';
  modoHalloween = false;
  modoNavidad = false;

  private cuentaAtrasSub?: Subscription;

  tituloFormulario = '';
  placeholderNombre = '';
  placeholderEmail = '';
  labelExtra = '';
  placeholderExtra = '';
  textoReglas = '';

  errorNombreVacio = '';
  errorNombreCorto = '';
  errorEmailVacio = '';
  errorEmailFormato = '';
  errorTipoInvitado = '';
  errorExtra = '';
  errorFecha = '';
  errorReglas = '';

  todosLosTipos = ['Humano', 'Fantasma', 'Vampiro', 'Bruja', 'Elfo', 'Reno', 'Duende'];
  tiposInvitado: string[] = [...this.todosLosTipos];

  constructor(
    private fb: FormBuilder,
    private halloweenService: HalloweenService,
    private navidadService: NavidadService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      tipoInvitado: ['', Validators.required],
      disfraz: ['', Validators.required],
      fechaLlegada: ['', Validators.required],
      aceptaReglas: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.halloweenService.modoHalloween$.subscribe((estado) => {
      this.modoHalloween = estado;
      if (estado) {
        this.modoNavidad = false;
        this.configurarModo('halloween');
      } else if (!this.modoNavidad) {
        this.configurarModo('normal');
      }
    });

    this.navidadService.modoNavidad$.subscribe((estado) => {
      this.modoNavidad = estado;
      if (estado) {
        this.modoHalloween = false;
        this.configurarModo('navidad');
      } else if (!this.modoHalloween) {
        this.configurarModo('normal');
      }
    });

    if (!this.modoHalloween && !this.modoNavidad) {
      this.configurarModo('normal');
    }
  }

  get f() {
    return this.formulario.controls;
  }

  configurarModo(modo: 'normal' | 'halloween' | 'navidad') {
  if (this.cuentaAtrasSub) {
    this.cuentaAtrasSub.unsubscribe();
    this.mensajeCuentaAtras = '';
  }

  Object.keys(this.formulario.controls).forEach(key => {
    const control = this.formulario.get(key);
    control?.markAsUntouched();
    control?.updateValueAndValidity();
  });

  this.mensajeExito = '';
  this.mensajeCuentaAtras = '';

  if (modo === 'halloween') {
    this.tiposInvitado = this.todosLosTipos.filter(
      (t) => t !== 'Elfo' && t !== 'Reno'
    );
    this.tituloFormulario = '🎃 Fiesta de Halloween - Registro de Invitados 🎃';
    this.placeholderNombre = 'Tu nombre terrorífico';
    this.placeholderEmail = 'correo@maldito.com';
    this.labelExtra = 'Disfraz:';
    this.placeholderExtra = 'Tu disfraz';
    this.textoReglas = 'Prometo no morder a los demás invitados';
    this.errorNombreVacio = '👻 Este campo da más miedo vacío, ¡rellénalo!';
    this.errorNombreCorto = '👻 El nombre es demasiado corto, ¡da miedo!';
    this.errorEmailVacio = '👻 Este campo da más miedo vacío, ¡rellénalo!';
    this.errorEmailFormato = '🩸 Ese correo parece maldito… revisa el formato.';
    this.errorTipoInvitado = '👻 Debes elegir un tipo de invitado';
    this.errorExtra = '👻 Este campo da más miedo vacío, ¡rellénalo!';
    this.errorFecha = '👻 Necesitamos saber cuándo llegarás';
    this.errorReglas = '👻 Debes aceptar las reglas para poder entrar';
    this.iniciarCuentaAtras(9, 31, '🎃 ¡La noche de los bugs ha comenzado! 💀', 'para la medianoche de Halloween 🎃');

  } else if (modo === 'navidad') {
    this.tiposInvitado = this.todosLosTipos.filter(
      (t) => t !== 'Fantasma' && t !== 'Vampiro' && t !== 'Bruja' && t !== 'Duende'
    );
    this.tituloFormulario = '🎅 Fiesta de Navidad - Registro de Invitados 🎅';
    this.placeholderNombre = 'Tu nombre navideño';
    this.placeholderEmail = 'correo@elfo.com';
    this.labelExtra = 'Regalo o plato navideño:';
    this.placeholderExtra = 'Tu contribución festiva';
    this.textoReglas = 'Prometo cantar villancicos con alegría 🎶';
    this.errorNombreVacio = '🎁 Falta el nombre en la lista de Santa';
    this.errorNombreCorto = '🎄 Nombre demasiado corto, ¡añade más magia!';
    this.errorEmailVacio = '🎅 No olvides dejar tu correo navideño';
    this.errorEmailFormato = '🎁 Ese correo no parece del taller de Santa';
    this.errorTipoInvitado = '🎄 Debes elegir tu rol en la fiesta';
    this.errorExtra = '🎅 Cuéntanos qué traerás';
    this.errorFecha = '🎄 Necesitamos saber cuándo llegarás al Polo Norte';
    this.errorReglas = '🎁 Debes prometer esparcir alegría navideña';
    this.iniciarCuentaAtras(11, 31, '🎆 ¡Feliz Año Nuevo! 🎉', 'para la medianoche de Año Nuevo 🎆');

  } else {
    this.tiposInvitado = ['Humano'];
    this.tituloFormulario = '🎉 Registro de Invitados';
    this.placeholderNombre = 'Tu nombre completo';
    this.placeholderEmail = 'correo@ejemplo.com';
    this.labelExtra = 'Ocupación o rol:';
    this.placeholderExtra = 'Tu profesión o rol';
    this.textoReglas = 'Acepto los términos del evento';
    this.errorNombreVacio = '⚠️ Este campo es obligatorio';
    this.errorNombreCorto = '⚠️ El nombre es demasiado corto';
    this.errorEmailVacio = '⚠️ Introduce tu correo electrónico';
    this.errorEmailFormato = '⚠️ El formato del correo no es válido';
    this.errorTipoInvitado = '⚠️ Debes elegir un tipo de invitado';
    this.errorExtra = '⚠️ Este campo es obligatorio';
    this.errorFecha = '⚠️ Selecciona una fecha';
    this.errorReglas = '⚠️ Debes aceptar las reglas';
    this.mensajeCuentaAtras = '';

    if (this.cuentaAtrasSub) {
      this.cuentaAtrasSub.unsubscribe();
      this.cuentaAtrasSub = undefined;
    }
  }
}

  iniciarCuentaAtras(mes: number, dia: number, mensajeFinal: string, textoEvento: string) {
    if (this.cuentaAtrasSub) {
      this.cuentaAtrasSub.unsubscribe();
    }

    const ahora = new Date();
    const año = ahora.getFullYear();
    const fechaObjetivo = new Date(año, mes, dia, 23, 59, 59);
    if (ahora > fechaObjetivo) fechaObjetivo.setFullYear(año + 1);

    this.cuentaAtrasSub = interval(1000).subscribe(() => {
      const diferencia = fechaObjetivo.getTime() - new Date().getTime();

      if (diferencia <= 0) {
        this.mensajeCuentaAtras = mensajeFinal;
        this.cuentaAtrasSub?.unsubscribe();
        return;
      }

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
      const segundos = Math.floor((diferencia / 1000) % 60);

      this.mensajeCuentaAtras = `⏳ Faltan ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos ${textoEvento}`;
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      const nombre = this.formulario.value.nombre;
      this.mensajeExito = `✅ ¡Bienvenido/a, ${nombre}! Tu registro ha sido completado con éxito.`;
      this.formulario.reset();
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}