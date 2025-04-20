/**
 * Déclaration de types pour les modules CSS
 * Permet à TypeScript de reconnaître les imports de fichiers CSS comme des modules
 */
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
