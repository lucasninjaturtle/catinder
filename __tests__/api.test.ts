import { getCats } from '../src/core/api/cats.api';
import { addFavourite, getFavourites, removeFavourite } from '../src/core/api/favourite.api';

import { httpAdapter } from '../src/config/adapters/http.adapter';

jest.mock('../src/config/adapters/http.adapter');

describe('API Tests', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada test
  });

  test('getCats must obtain a list of cats', async () => {
    const mockCats = [{ id: '1', url: 'https://example.com/cat.jpg', breeds: [] }];
    (httpAdapter.get as jest.Mock).mockResolvedValue(mockCats);

    const cats = await getCats(1);

    expect(httpAdapter.get).toHaveBeenCalledWith('/images/search', expect.any(Object));
    expect(cats).toEqual(mockCats);
  });

  test('addFavourite must send a POST request', async () => {
    (httpAdapter.post as jest.Mock).mockResolvedValue(undefined);

    await addFavourite('image123');

    expect(httpAdapter.post).toHaveBeenCalledWith('/favourites', { image_id: 'image123' });
  });

  test('getFavourites must obtain a list of favourites', async () => {
    const mockFavourites = [{ id: 'fav1', image_id: 'image123' }];
    (httpAdapter.get as jest.Mock).mockResolvedValue(mockFavourites);

    const favourites = await getFavourites();

    expect(httpAdapter.get).toHaveBeenCalledWith('/favourites');
    expect(favourites).toEqual(mockFavourites);
  });

  test('removeFavourite must delete a favourite cat from ID', async () => {
    (httpAdapter.delete as jest.Mock).mockResolvedValue(undefined);

    await removeFavourite('fav1');

    expect(httpAdapter.delete).toHaveBeenCalledWith('/favourites/fav1');
  });
});
