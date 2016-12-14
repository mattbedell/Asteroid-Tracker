DROP TABLE IF EXISTS asteroids;

CREATE TABLE asteroids (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  estimated_diameter_max DOUBLE PRECISION,
  neo_reference_id NUMERIC,
  is_potentially_hazardous_asteroid BOOLEAN,
  miles_per_hour DOUBLE PRECISION,
  miss_distance_miles DOUBLE PRECISION,
  miss_distance_lunar DOUBLE PRECISION,
  nasa_jpl_url VARCHAR(255),
  orbiting_body VARCHAR(20),
  close_approach_date DATE,
  absolute_magnitude SMALLINT
);
