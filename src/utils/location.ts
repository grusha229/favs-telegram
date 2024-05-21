export const getLocationPromise = new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position)
    }, (error) => {
      reject(error);
    })
  });