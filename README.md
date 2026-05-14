# MatrixQuant Frontend

Plataforma Premium de Factorización de Matrices e Inteligencia Estadística construida con Next.js 16 y Bun.

## Características

- **Factorización QR**: Descomposición de alto rendimiento utilizando el backend en Go.
- **Análisis Estadístico**: Métricas en tiempo real (Máximo, Mínimo, Promedio, Suma) a través del backend en Node.js.
- **Autenticación Dual**: Flujo unificado de inicio de sesión y registro para ambos sistemas.
- **Diseño Glassmorphism**: Interfaz moderna y premium con estética de alta gama.
- **Persistencia de Sesión**: Mantente conectado incluso tras recargar la página.

## Inicio Rápido

### Requisitos Previos

- [Bun](https://bun.sh/) instalado localmente.
- Backends (Go y Node) ejecutándose en sus respectivos puertos.

### Instalación Local

1. Instalar dependencias:
   ```bash
   bun install
   ```

2. Configurar variables de entorno:
   Crea un archivo `.env` basado en `.env.template`:
   ```env
   NEXT_PUBLIC_GO_API_URL=http://localhost:3030
   NEXT_PUBLIC_NODE_API_URL=http://localhost:3050
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   bun run dev
   ```

### Configuración de Entorno
Ambos modos de Docker cargarán automáticamente las variables definidas en tu archivo `.env`. Asegúrate de tenerlo configurado correctamente antes de arrancar.

### Modo Desarrollo (con Hot-Reload)
Para ejecutar la aplicación en modo desarrollo dentro de un contenedor:
```bash
docker compose -f docker-compose.dev.yml up --build
```

### Modo Producción (Optimizado)
Para construir y ejecutar la imagen lista para producción (incluye el paso de `build` automático):
```bash
docker compose up -d --build
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

