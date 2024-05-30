export const custmizeAddress = (address: string) => {
    let firstFive = address.substring(0, 5);
    let lastFour = address.substr(address.length - 4);
    return firstFive + "..." + lastFour;
};

export function isValidYouTubeChannel(url: string) {
    const youtubeChannelRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com\/(channel\/|c\/)|youtube\.com\/user\/)?[a-zA-Z0-9_-]{1,}$/;
    // Test the input URL against the regular expression
    return youtubeChannelRegex.test(url);
  }

  