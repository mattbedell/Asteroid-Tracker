const db = require('./../lib/dbConnect')
// parse looked up historical asteroid data and save to database
function parseNEOdata(req, res, next) {
  let data = res.data.near_earth_objects;
  let distFilter;
  // if data is historical configure it in a way the parser can understand
  if(res.isHistorical) {
    for(day in data) {
      distFilter = data[day].filter((asteroid) => {
        // Get all asteroids closer than 50 lunar distance
        return asteroid.close_approach_data[0].miss_distance.lunar < 50;
      })
    }
  } else {
    // if current data configure it in a way the parser can understand
      distFilter = res.data
    }
  // assemble array of asteroid object to be inserted into database
  let formattedData = distFilter.map((asteroid) => {
    // configure data in object to be saved to the database or configure today's data to be bundled with historical data
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
    // if data is current set nav_val to today so front-end can consume it correctly
    if(res.isToday) {
      formattedAsteroid.nav_val = 'Today'
    } else {
      // get date of asteroids looked up and set month name so front end can consume it correctly
      let navParse = asteroid.close_approach_data[0].close_approach_date.split('-')[1]
      console.log(navParse);
      switch(navParse) {
        case '12':
        formattedAsteroid.nav_val = 'December'
        break;
        case '11':
        formattedAsteroid.nav_val = 'November'
        break;
        case '10':
        formattedAsteroid.nav_val = 'October'
        break;
        case '09':
        formattedAsteroid.nav_val = 'September'
        break;
        case '08':
        formattedAsteroid.nav_val = 'August'
        break;
        case '07':
        formattedAsteroid.nav_val = 'July'
        break;
        case '06':
        formattedAsteroid.nav_val = 'June'
        break;
        case '05':
        formattedAsteroid.nav_val = 'May'
        break;
        case '04':
        formattedAsteroid.nav_val = 'April'
        break;
        case '03':
        formattedAsteroid.nav_val = 'March'
        break;
        case '02':
        formattedAsteroid.nav_val = 'February'
        break;
        case '01':
        formattedAsteroid.nav_val = 'January'
        break;
        default:
        formattedAsteroid.nav_val = navParse
      }
    }
    //console.log(formattedAsteroid);
    return formattedAsteroid;
  })
  console.log(res.dataBundle);
  // if current and historical data exist merge them into an array to be send to front end
  if(res.dataBundle) {
    res.allAsteroids = [...res.dataBundle, ...formattedData];
  } else {
    // save historical data to be entered into the database
    res.data = formattedData
  }
  next()
}
function insertAsteroidsIntoDB(req, res, next) {
  // map through array of asteroids and save them to database
  res.data.map((asteroid) => {
    //console.log(res.data[0]);
    db.none(`INSERT INTO asteroids (name, neo_reference_id, estimated_diameter_max, is_potentially_hazardous_asteroid,
                                    miles_per_hour, miss_distance_lunar, miss_distance_miles, nasa_jpl_url, orbiting_body, close_approach_date, absolute_magnitude, nav_val)
            VALUES($/name/, $/neo_reference_id/, $/estimated_diameter_max/, $/is_potentially_hazardous_asteroid/,
            $/miles_per_hour/, $/miss_distance_lunar/, $/miss_distance_miles/, $/nasa_jpl_url/, $/orbiting_body/, $/close_approach_date/, $/absolute_magnitude/, $/nav_val/);`, asteroid)
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
