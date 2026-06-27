CREATE TABLE IF NOT EXISTS films_tags_tags (
                                               "filmsId" uuid NOT NULL,
                                               "tagsId" uuid NOT NULL,
                                               CONSTRAINT "PK_films_tags_tags" PRIMARY KEY ("filmsId", "tagsId"),
    CONSTRAINT "FK_films_tags_tags_films" FOREIGN KEY ("filmsId") REFERENCES films(id) ON DELETE CASCADE,
    CONSTRAINT "FK_films_tags_tags_tags" FOREIGN KEY ("tagsId") REFERENCES tags(id) ON DELETE CASCADE
    );


INSERT INTO films_tags_tags ("filmsId", "tagsId") VALUES
                                                      ('0e33c7f6-27a7-4aa0-8e61-65d7e5effecf', '11111111-1111-1111-1111-111111111111'),
                                                      ('51b4bc85-646d-47fc-b988-3e7051a9fe9e', '22222222-2222-2222-2222-222222222222'),
                                                      ('3bedbc5a-844b-40eb-9d77-83b104e0cf75', '22222222-2222-2222-2222-222222222222'),
                                                      ('5b70cb1a-61c9-47b1-b207-31f9e89087ff', '22222222-2222-2222-2222-222222222222'),
                                                      ('0354a762-8928-427f-81d7-1656f717f39c', '22222222-2222-2222-2222-222222222222'),
                                                      ('92b8a2a7-ab6b-4fa9-915b-d27945865e39', '22222222-2222-2222-2222-222222222222');