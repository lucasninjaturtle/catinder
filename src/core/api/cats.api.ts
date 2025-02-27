import { httpAdapter } from '../../config/adapters/http.adapter';
import { Cat } from '../../infrastructure/interfaces/cat.interface';


/**
 * Obtiene gatos aleatorios para mostrar en la app.
 */
export const getCats = async (limit = 10): Promise<Cat[]> => {
    return await httpAdapter.get<Cat[]>('/images/search', {
        size: 'med',
        mime_types: 'jpg',
        format: 'json',
        has_breeds: true,
        order: 'RANDOM',
        page: 0,
        limit,
    });
};
