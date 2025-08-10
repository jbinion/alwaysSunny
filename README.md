# Always Sunny Episode Time Tracker

A simple svelte app that visualizes the time and day of the week for each episode of _It's Always Sunny in Philadelphia_.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jbinion/alwaysSunny.git
   cd alwaysSunny
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   cd ./app && npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## Data

Episode data is stored in `episodes.json` and includes:

- Episode title
- Season and episode number
- Original air date
- In-universe date and time

## Acknowledgments

- Inspired by [this reddit post](https://www.reddit.com/r/IASIP/comments/1jdp09j/the_day_and_time_at_the_beginning_of_every/)
- Data sourced from https://api.tvmaze.com/, start times sourced by me watching each episode
- Built with [Svelte](https://svelte.dev/) and [ECharts](https://echarts.apache.org/en/index.html)
