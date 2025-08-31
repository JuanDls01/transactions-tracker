export const getPathActiveClass = (url: string, currentPath: string) =>
  url === currentPath ? 'text-primary font-bold' : 'text-muted-foreground';
