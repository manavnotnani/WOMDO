export const custmizeAddress = (address: string) => {
    let firstFive = address.substring(0, 5);
    let lastFour = address.substr(address.length - 4);
    return firstFive + "..." + lastFour;
};