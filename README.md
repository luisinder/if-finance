# IT Finance Management Application

Esta aplicación de gestión financiera para departamentos de IT permite administrar facturas, proveedores y pagos de una empresa internacional.

## Características

- Gestión de facturas con capacidad de adjuntar archivos PDF
- Administración de proveedores
- Registro y seguimiento de pagos
- Búsqueda global y específica por entidad
- Sistema de autenticación de usuarios con roles (administrador y usuario normal)
- Interfaz de usuario intuitiva construida con React y Tailwind CSS

## Requisitos previos

- Node.js (versión 14.0.0 o superior)
- npm (normalmente viene con Node.js)

## Instalación

1. Clone el repositorio:
   ```
   git clone [URL_DEL_REPOSITORIO]
   cd it-finance-management
   ```

2. Instale las dependencias:
   ```
   npm install
   ```

## Configuración

1. Copie el archivo `.env.example` a `.env` y ajuste las variables de entorno según sea necesario:
   ```
   cp .env.example .env
   ```

2. Edite el archivo `.env` con su editor de texto preferido y configure las variables necesarias, como la URL de la API backend si es aplicable.

## Ejecución en modo desarrollo

Para iniciar la aplicación en modo desarrollo, ejecute:

```
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` por defecto.

## Construcción para producción

Para construir la aplicación para producción, ejecute:

```
npm run build
```

Esto generará una versión optimizada de la aplicación en el directorio `dist`.

## Despliegue

Para desplegar la aplicación:

1. Construya la aplicación como se describió anteriormente.

2. El contenido del directorio `dist` puede ser servido por cualquier servidor web estático. Por ejemplo, puede usar `serve` para una prueba rápida:

   ```
   npm install -g serve
   serve -s dist
   ```

3. Para un despliegue en producción, considere usar servicios como Netlify, Vercel, o configurar un servidor web como Nginx o Apache para servir los archivos estáticos.

## Uso

1. Acceda a la aplicación a través del navegador.
2. Inicie sesión con las siguientes credenciales de prueba:
   - Usuario normal: username: "user", password: "user"
   - Administrador: username: "admin", password: "admin"
3. Explore las diferentes secciones de la aplicación: Dashboard, Facturas, Proveedores y Pagos.
4. Los administradores tienen acceso adicional a la gestión de usuarios.

## Desarrollo adicional

- Implementar la autenticación real y el manejo de sesiones.
- Conectar con un backend para persistencia de datos.
- Agregar más pruebas unitarias y de integración.
- Mejorar la validación de formularios y el manejo de errores.

## Contribuir

Las contribuciones son bienvenidas. Por favor, abra un issue para discutir cambios mayores antes de crear un pull request.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)