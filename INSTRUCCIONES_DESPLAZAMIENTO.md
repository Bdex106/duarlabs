# Instrucciones de Uso: Desplazamiento Premium (RealtorPro)

Este documento describe cómo implementar y personalizar el efecto de desplazamiento "Premium Parallax & Dissolve" utilizado en el proyecto RealtorPro. Este efecto crea una transición cinematográfica al hacer scroll, ideal para landing pages de lujo.

## Características Principales
1. **Contenedor Sticky**: El contenido permanece fijo en el centro de la pantalla mientras el usuario hace scroll.
2. **Efecto de Disolución (Arch Dissolve)**: La imagen central se expande, se desenfoca y desaparece gradualmente.
3. **Elevación de Contenido**: El título y la barra de búsqueda suben y se desvanecen sincronizadamente.
4. **Suavizado (Spring)**: Los movimientos no son bruscos gracias a una física de resorte (spring physics) que añade inercia al scroll.

## Requisitos
- `framer-motion`: Para las animaciones y el tracking del scroll.
- `lucide-react`: Para los iconos.
- `tailwindcss`: Para el layout y estilos rápidos.

## Estructura del Código

### 1. Configuración del Scroll
Utilizamos `useScroll` para rastrear el progreso del scroll dentro de la sección y `useSpring` para suavizar ese valor.

```javascript
const sectionRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start start", "end start"], // Inicia cuando el tope toca el tope, termina cuando el final toca el tope
});

// Añade inercia y suavidad al scroll
const smooth = useSpring(scrollYProgress, { mass: 0.8, stiffness: 80, damping: 20 });
```

### 2. Transformaciones de los Elementos
Se crean valores derivados del scroll usando `useTransform`:

- **Imagen de Arco**:
  ```javascript
  const archScale = useTransform(smooth, [0, 0.4], [1, 1.3]);
  const archOpacity = useTransform(smooth, [0, 0.35], [0.6, 0]);
  const archBlur = useTransform(smooth, [0, 0.35], ["blur(0px)", "blur(20px)"]);
  ```

- **Texto y Título**:
  ```javascript
  const titleY = useTransform(smooth, [0, 0.5], [0, -120]);
  const titleOpacity = useTransform(smooth, [0, 0.4], [1, 0]);
  ```

### 3. Implementación en el JSX
La sección debe tener una altura mayor (ej. `h-[200vh]`) para dar espacio al scroll, y un contenedor interno `sticky top-0 h-screen`.

```jsx
<section ref={sectionRef} className="relative h-[200vh]">
  <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
    {/* Imagen con estilos dinámicos */}
    <motion.div style={{ scale: archScale, opacity: archOpacity, filter: archBlur }}>
      <img src="..." />
    </motion.div>

    {/* Texto con movimiento vertical */}
    <motion.h1 style={{ opacity: titleOpacity, y: titleY }}>
      Tu Título
    </motion.h1>
  </div>
</section>
```

## Consejos de Personalización
- **Duración del Efecto**: Cambia los rangos de `[0, 0.4]` en `useTransform`. Un número más pequeño (ej. `0.2`) hará que el efecto termine más rápido al empezar a bajar.
- **Intensidad del Movimiento**: Ajusta el valor final de `useTransform` (ej. cambiar `-120` por `-200` para que el texto suba más).
- **Física del Suave**: Modifica `stiffness` (rigidez) y `damping` (amortiguación) en `useSpring` para cambiar la sensación de "pesadez" del scroll.

---
*Documentación generada para el proyecto RealtorPro.*
