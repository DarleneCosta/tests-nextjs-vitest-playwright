export function sanitizeString(str: string): string {
    const clean = !str || typeof str !== 'string' ? '' : str.trim().normalize();
    return clean;
}