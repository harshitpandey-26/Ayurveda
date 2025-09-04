import { Op } from "sequelize";

export const flightFilter = (query) => {
  let customFilter = {};
  let airportFilter = {};
  let sortFilter = [];

  // trips=DEL-BOM (codes, not IDs)
  if (query.trips) {
    const [departureCode, arrivalCode] = query.trips.split("-");

    if (departureCode === arrivalCode) {
      throw new ValidationError([
        {
          field: "arrivalCode",
          message: "Arrival code and Departure code can not be same",
        },
      ]);
    }

    airportFilter.departureAirport = { code: departureCode };
    airportFilter.arrivalAirport = { code: arrivalCode };
  }

  // Price filter
  if (query.minPrice || query.maxPrice) {
    customFilter.price = {};
    if (query.minPrice) {
      customFilter.price[Op.gte] = Number(query.minPrice);
    }
    if (query.maxPrice) {
      customFilter.price[Op.lte] = Number(query.maxPrice);
    }
  }

  // Time filter
  if (query.tripDate) {
    const startOfDay = new Date(`${query.tripDate}T00:00:00`);
    const endOfDay = new Date(`${query.tripDate}T23:59:59`);

    customFilter.departureTime = {
      [Op.between]: [startOfDay, endOfDay],
    };
  }

  // Sorting filter
  if(query.sortBy){
    const params = query.sortBy.split(",");
    const sortFilters = params.map((param)=> param.split("_"));
    sortFilter = sortFilters;
  }


  return { customFilter, airportFilter, sortFilter };
};
