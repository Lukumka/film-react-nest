import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from '../src/films/films.service';
import { FilmsController } from '../src/films/films.controller';

describe('FilmsController', () => {
  let controller: FilmsController;

  const filmsServiceMock = {
    getAll: jest.fn(),
    getSchedule: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: filmsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return films list', async () => {
    const result = {
      total: 1,
      items: [
        {
          id: 'film-1',
          title: 'Test Film',
          rating: 8.5,
          director: 'Test Director',
          about: 'About film',
          description: 'Description film',
          image: 'image.jpg',
          cover: 'cover.jpg',
          tags: ['драма'],
        },
      ],
    };

    filmsServiceMock.getAll.mockResolvedValue(result);

    await expect(controller.getListFilms()).resolves.toEqual(result);

    expect(filmsServiceMock.getAll).toHaveBeenCalledTimes(1);
  });

  it('should return film schedule by film id', async () => {
    const filmId = 'film-1';

    const result = [
      {
        id: 'session-1',
        daytime: '2026-06-20T12:00:00.000Z',
        hall: '1',
        rows: 10,
        seats: 10,
        price: 350,
        taken: ['1:1', '2:3'],
      },
    ];

    filmsServiceMock.getSchedule.mockResolvedValue(result);

    await expect(controller.getFilmsSchedule(filmId)).resolves.toEqual(result);

    expect(filmsServiceMock.getSchedule).toHaveBeenCalledTimes(1);
    expect(filmsServiceMock.getSchedule).toHaveBeenCalledWith(filmId);
  });
});
