export const getPathActiveClass = (url: string, currentPath: string) =>
  url === currentPath 
    ? 'font-bold dark:text-foreground text-primary' 
    : 'text-muted-foreground';
