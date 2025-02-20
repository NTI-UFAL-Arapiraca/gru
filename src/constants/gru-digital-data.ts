export const GRU_DIGITAL_DATA_BY_UNIVERSITY_LOCATION = {
  arapiraca: {
    gruLibrary: {
      serviceCode: "19762",
      referenceNumber: "1976202",
    },
    gruRestaurant: {
      serviceCode: "19310",
      referenceNumber: "1931002",
    },
  },
  sertao: {
    gruLibrary: {
      serviceCode: "19762",
      referenceNumber: "1976203",
    },
    gruRestaurant: {
      serviceCode: "19310",
      referenceNumber: "1931003",
    },
  },
};

export type GruDigitalLocale =
  keyof typeof GRU_DIGITAL_DATA_BY_UNIVERSITY_LOCATION;
