const db = require('./../lib/dbConnect')

function parseNEOdata(req, res, next) {
  let data = res.data.near_earth_objects;
  // Get all asteroids closer than 50 lunar distance
  let distFilter;
  for(day in data) {
    distFilter = data[day].filter((asteroid) => {
      return asteroid.close_approach_data[0].miss_distance.lunar < 50;
    })
  }
  // assemble array of asteroid object to be inserted into database
  let formattedData = distFilter.map((asteroid) => {
    let formattedAsteroid = {
      neo_reference_id: asteroid.neo_reference_id,
      name: asteroid.name,
      estimated_diameter_max: asteroid.estimated_diameter.miles.estimated_diameter_max,
      is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
      miles_per_hour: asteroid.close_approach_data[0].relative_velocity.miles_per_hour,
      miss_distance_lunar: asteroid.close_approach_data[0].miss_distance.lunar,
      miss_distance_miles: asteroid.close_approach_data[0].miss_distance.miles,
      nasa_jpl_url: asteroid.nasa_jpl_url,
      orbiting_body: asteroid.close_approach_data[0].orbiting_body,
      close_approach_date: asteroid.close_approach_data[0].close_approach_date,
      absolute_magnitude: asteroid.absolute_magnitude_h
    };
    //console.log(formattedAsteroid);
    return formattedAsteroid;
  })
  res.data = formattedData;
  next()
}
function insertAsteroidsIntoDB(req, res, next) {
  // neo_reference_id, name, estimated_diameter_max, is_potentially_hazardous_asteroid,
  // miles_per_hour, miss_distance_lunar, miss_distance_miles, nasa_jpl_url, orbiting_body, close_approach_date, absolute_magnitude
  res.data.map((asteroid) => {
    //console.log(res.data[0]);
    db.none(`INSERT INTO asteroids (name, neo_reference_id, estimated_diameter_max, is_potentially_hazardous_asteroid,
                                    miles_per_hour, miss_distance_lunar, miss_distance_miles, nasa_jpl_url, orbiting_body, close_approach_date, absolute_magnitude)
            VALUES($/name/, $/neo_reference_id/, $/estimated_diameter_max/, $/is_potentially_hazardous_asteroid/,
            $/miles_per_hour/, $/miss_distance_lunar/, $/miss_distance_miles/, $/nasa_jpl_url/, $/orbiting_body/, $/close_approach_date/, $/absolute_magnitude/);`, asteroid)
    .then(() => {
      next()
    })
    .catch((err) => {
      console.log(`---> Error in models -> updateDB(): ${err}`);
    })
  })
}
module.exports = {
  parseNEOdata,
  insertAsteroidsIntoDB
}
