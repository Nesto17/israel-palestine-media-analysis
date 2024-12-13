const margin = { top: 50, right: 20, bottom: 50, left: 100 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

let maxSubreddits = 5;

// Key events to highlight
const events = [
  { date: new Date("2023-10-07"), event: "Hamas Attack" },
  { date: new Date("2023-11-22"), event: "Temporary Truce" },
  { date: new Date("2023-11-30"), event: "Truce Extended" },
];

d3.json("data/d3/linechart_data.json").then(data => {
  data.forEach(d => {
    d.date = new Date(d.date);
    d.comment_count = +d.comment_count;
    d.overall_rank = +d.overall_rank;
  });

  const rankedSubreddits = [...new Set(data.map(d => d.subreddit))];
  let filteredData = data.filter(d => d.overall_rank <= maxSubreddits);

  const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.comment_count)])
    .range([height, 0]);

  const color = d3.scaleOrdinal()
    .domain(rankedSubreddits)
    .range(d3.schemeTableau10);

  const svg = d3.select("#plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // X-axis with rotated labels
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-30)") // Rotate labels
    .style("text-anchor", "end"); // Adjust alignment

  svg.append("g").call(d3.axisLeft(y));

  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.comment_count));

  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background-color", "#fff")
    .style("border", "1px solid #ccc")
    .style("padding", "5px")
    .style("pointer-events", "none")
    .style("opacity", 0);

  // Add vertical event lines with vertical labels
  events.forEach(event => {
    svg.append("line")
      .attr("x1", x(event.date))
      .attr("x2", x(event.date))
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .style("stroke-dasharray", "4,4");

    // Add vertical event labels
    svg.append("text")
      .attr("x", x(event.date) - 5)
      .attr("y", 10)
      .attr("transform", `rotate(-90,${x(event.date) - 5},10)`) // Rotate vertically
      .attr("fill", "red")
      .style("font-size", "12px")
      .style("text-anchor", "end") // Align vertically
      .text(event.event);
  });

  function updateChart() {
    svg.selectAll(".line").remove();

    const currentData = data.filter(d => d.overall_rank <= maxSubreddits);

    const groupedData = d3.group(currentData, d => d.subreddit);

    groupedData.forEach((values, key) => {
      const path = svg.append("path")
        .datum(values)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", color(key))
        .attr("stroke-width", 1.5)
        .attr("d", line);

      // Add hover interaction
      path.on("mouseover", (event) => {
        tooltip.style("opacity", 1)
          .html(`Subreddit: ${key}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
        path.attr("stroke-width", 3); // Highlight the line
      })
      .on("mousemove", (event) => {
        tooltip.style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
        path.attr("stroke-width", 1.5); // Reset line thickness
      });
    });
  }

  function addSubreddit() {
    if (maxSubreddits < rankedSubreddits.length) {
      maxSubreddits++;
      updateChart();
    }
  }

  function removeSubreddit() {
    if (maxSubreddits > 1) {
      maxSubreddits--;
      updateChart();
    }
  }

  d3.select("#addButton").on("click", addSubreddit);
  d3.select("#removeButton").on("click", removeSubreddit);

  updateChart();
});
