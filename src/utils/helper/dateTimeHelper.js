export const compareTime = (departureTime,arrivalTime) => {
    let depTime = new Date(departureTime);
    let arrTime = new Date(arrivalTime);

    return depTime.getTime() > arrTime.getTime();
}