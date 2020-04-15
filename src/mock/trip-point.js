const tripPointTypes = {
  transport: [`Taxi`, `Bus`, `Train`, `Ship`],
  place: [`Check`, `Sightseeing`, `Restaurant`],
  type: [`Transport`, `Drive`, `Flight`],
};

const tripTimes = {
  beginTimes: `10:20`,
  endTimes: `18:40`,
};

const tripEndPoints = [
  `Moscow`, `Saint Petersburg`, `Yekaterinburg`, `Volgograd`,
  `Samara`, `Chelyabinsk`, `Vladivostok`, `Yfa`, `Sochi`, `Vladivostok`
];

const tripPointOffers = [{
  title: `title`,
  price: 10,
}, {
  title: `title`,
  price: 20,
}, {
  title: `title`,
  price: 30,
}, {
  title: `title`,
  price: 40,
}, {
  title: `title`,
  price: 50,
}];

const tripText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cras aliquet varius magna, non porta ligula feugiat eget.
                  Fusce tristique felis at fermentum pharetra.
                  Aliquam id orci ut lectus varius viverra.
                  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
                  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
                  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
                  Sed sed nisi sed augue convallis suscipit in sed felis.
                  Aliquam erat volutpat.
                  Nunc fermentum tortor ac porta dapibus.
                  In rutrum ac purus sit amet tempus.`;

const tripEndPointImage = `http://picsum.photos/248/152?r=${Math.random()}`;

const generateTripPoint = {
  type,
  destination: {
    city,
    title,
    description,
    image,
  },
  options
};

export {generateTripPoint};
