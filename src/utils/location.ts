export const getLocationPromise = new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position)
    }, (error) => {
      reject(error);
    })
  });

export const getRadius = (lat: number, lng: number, lngRadius: number): number => {
    return getDistanceBetweenPoints(
       { lat: lat, lng: lng - lngRadius / 2 },
       { lat: lat, lng: lng + lngRadius / 2 } 
    )
}

export const getDistanceBetweenPoints = (point1, point2): number => {
   const earthRadius: number = 6371;
   const [dLat, dLng] = [
       degToRadians(point2.lat - point1.lat),
       degToRadians(point2.lng - point1.lng)
   ];
   const  a = 
       Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
       Math.cos(degToRadians(point1.lat)) * Math.cos(degToRadians(point2.lat)) * 
       Math.sin( dLng / 2 ) * Math.sin( dLng / 2 );
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt( 1 - a )); 
   return Math.abs(( earthRadius * c ) * 350);
}

export const degToRadians = (deg: number): number => {
   return deg * ( Math.PI / 180 );
}

export const getDelta = (lat, lon, distance) => {
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = distance / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

  return {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta,
  }
}
