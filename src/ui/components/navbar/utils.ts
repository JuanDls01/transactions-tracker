export const getPathActiveClass = (url: string, currentPath: string) =>
  url === currentPath ? 'text-foreground font-bold' : 'text-muted-foreground';
