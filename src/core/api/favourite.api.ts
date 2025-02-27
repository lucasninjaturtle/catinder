import { httpAdapter } from '../../config/adapters/http.adapter';
import { Favourite } from '../../infrastructure/interfaces/favourite.interface';


/**
 * Añade un gato a favoritos
 */
export const addFavourite = async (imageId: string): Promise<void> => {
    await httpAdapter.post('/favourites', { image_id: imageId });
};

/**
 * Obtiene la lista de favoritos
 */
export const getFavourites = async (): Promise<Favourite[]> => {
    return await httpAdapter.get<Favourite[]>('/favourites');
};

/**
 * Elimina un favorito por ID
 */
export const removeFavourite = async (favouriteId: string): Promise<void> => {
    await httpAdapter.delete(`/favourites/${favouriteId}`);
};
