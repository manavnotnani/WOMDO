const Web3 = require('web3');

class BlockchainService {
  constructor(providerUrl) {
    this.web3 = new Web3(providerUrl);
    this.events = [];
    this.lastBlockNumber = 0;
  }

  async start() {
    const latestBlockNumber = await this.web3.eth.getBlockNumber();
    this.lastBlockNumber = latestBlockNumber;

    // Fetch initial events
    await this.fetchEvents(0, latestBlockNumber);

    // Continue fetching new events
    this.fetchEventsInterval = setInterval(async () => {
      const currentBlockNumber = await this.web3.eth.getBlockNumber();
      if (currentBlockNumber > this.lastBlockNumber) {
        await this.fetchEvents(this.lastBlockNumber + 1, currentBlockNumber);
        this.lastBlockNumber = currentBlockNumber;
      }
    }, 5000); // Adjust the interval as needed
  }

  async fetchEvents(fromBlock, toBlock) {
    try {
      // Fetch and process events from the blockchain
      const events = await this.processBlockEvents(fromBlock, toBlock);
      this.events.push(...events);
      console.log(`Fetched ${events.length} new events`);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  async processBlockEvents(fromBlock, toBlock) {
    // Implement your logic to fetch and process events from the blockchain
    // Return an array of events
    return [];
  }

  getEvents() {
    return this.events;
  }
}

module.exports = BlockchainService;