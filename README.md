<h1 align="center">
    <img src="https://github.com/GermoAlt/ScreenSpace-back/blob/main/images/svg/logo-no-background.svg?raw=true" width="60%"/>
</h1>

<p align="center">
  <a href="#descripción">Descripción</a> •
  <a href="#características">Características</a> •
  <a href="#requisitos-previos">Requisitos Previos</a> •
  <a href="#instalación">Instalación</a> •
  <a href="#configuración">Configuración</a> •
  <a href="#ejecución">Ejecución</a> •
  <a href="#contexto-académico">Contexto Académico</a> •
  <a href="#integrantes-del-equipo">Integrantes del Equipo</a>
</p>


## Descripción
**ScreenSpace** es una aplicación mobile para la gestión de salas de cine en Argentina.
* Este README corresponde al backend, el correspondiente al frontend se puede encontrar [acá](https://github.com/GermoAlt/ScreenSpace-back#readme).


## Características

- Este proyecto utiliza un backend desarrollado con Java Spring Boot. La comunicación entre el frontend y el backend se realiza a través de API REST.

## Requisitos Previos

Asegúrate de tener los siguientes requisitos antes de instalar y ejecutar la aplicación:
- Node.js y npm instalados
- SDK de Android
- Emulador o dispositivo físico para probar la aplicación

## Instalación
Sigue estos pasos para descargar el código de la aplicación:
1. Clona este repositorio: `git clone https://github.com/GermoAlt/ScreenSpace-app.git`
2. Navega al directorio del proyecto: `cd proyecto`

```bash
# Clonar el repositorio
git clone https://github.com/GermoAlt/ScreenSpace-app.git

# Navegar al directorio del repositorio
cd <DIRECTORIO_DEL_REPOSITORIO>
```

## Configuración
### Inicio de sesión con Google

Esta aplicación utiliza el inicio de sesión con Google para autenticar a los usuarios que no son dueños. Para poder utilizar esta funcionalidad, es necesario seguir los siguientes pasos:

1. Asegúrate de tener una cuenta de desarrollador de Google y haber creado un proyecto en [Google Cloud Console](https://console.cloud.google.com).

2. Obtén las credenciales de OAuth 2.0 para tu proyecto siguiendo la documentación de [Google Sign-In](https://developers.google.com/identity/sign-in/web/sign-in).

3. Copia las credenciales de cliente proporcionadas por Google y pégalas en el archivo `.env` de la aplicación móvil. Asegúrate de definir la variable de entorno `GOOGLE_CLIENT_ID` con el valor correspondiente.

Con esto, los usuarios podrán iniciar sesión en la aplicación utilizando sus cuentas de Google.



## Ejecución

Sigue estos pasos para ejecutar la aplicación:

1. Instala las dependencias: `npm install`
2. Inicia el emulador de Android.
3. Ejecuta el comando: `npx react-native run-android`.
4. La aplicación se instalará y ejecutará en el emulador o dispositivo físico.

## Contexto Académico
* Profesores:
    - Christian Mazzeo
    - Joaquín Timerman

## Integrantes del Equipo

* Desarrollo de aplicaciones 1
* Grupo 1


<table>
  <tr>
    <td align="center"><sub><b>German Altairac</b></sub><br /><sub>1084200</sub><br/><a>🐵</a></td>
    <td align="center"><sub><b>Nicolas Martin Cano</b></sub><br /><sub>1147246</sub><br/><a>🙈</a></td>
    <td align="center"><sub><b>Fernando Ferreyra</b></sub><br /><sub>1137834</sub><br/><a>🙊</a></td>
    <td align="center"><sub><b>Belen Enriquez</b></sub><br /><sub>1092598</sub><br/><a>🙉</a></td>
  </tr>
</table>

> UADE - Licenciatura en gestión de tecnologías de la información - 2023
